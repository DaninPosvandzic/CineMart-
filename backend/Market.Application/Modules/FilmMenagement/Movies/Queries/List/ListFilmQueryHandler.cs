using CineMart.Application.Modules.FilmManagement.Queries.List;
using Microsoft.EntityFrameworkCore;

public sealed class ListFilmQueryHandler : IRequestHandler<ListFilmQuery, PageResult<ListFilmQueryDto>>
{
    private readonly IAppDbContext _ctx;

    public ListFilmQueryHandler(IAppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<PageResult<ListFilmQueryDto>> Handle(ListFilmQuery request, CancellationToken ct)
    {
        var query = _ctx.Films
            .AsNoTracking()
            .Include(f => f.Genre)
            .Include(f => f.Director)
            .AsQueryable();

        // 🔎 SEARCH
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(f => f.Title.ToLower().Contains(term));
        }

        // 🔀 SORTING
        query = request.SortBy.ToLower() switch
        {
            "rating" => request.SortDir == "desc"
                ? query.OrderByDescending(f => f.AverageRating)
                : query.OrderBy(f => f.AverageRating),

            "price" => request.SortDir == "desc"
                ? query.OrderByDescending(f => f.PurchasePrice)
                : query.OrderBy(f => f.PurchasePrice),

            "year" => request.SortDir == "desc"
                ? query.OrderByDescending(f => f.ReleaseYear)
                : query.OrderBy(f => f.ReleaseYear),

            // default → title
            _ => request.SortDir == "desc"
                ? query.OrderByDescending(f => f.Title)
                : query.OrderBy(f => f.Title)
        };

        // 🎯 PROJECTION (kao kod tebe)
        var projectedQuery = query.Select(f => new ListFilmQueryDto
        {
            Id = f.Id,
            Title = f.Title,
            ReleaseYear = f.ReleaseYear,
            PurchasePrice = f.PurchasePrice,
            PictureUrl = f.PictureUrl,
            RentPrice = f.RentPrice,
            GenreName = f.Genre != null ? f.Genre.Name : null,
            AverageRating = f.AverageRating,
            ViewCount = f.ViewCount,
            UserId = f.UserId
        });

        // 📊 TOTAL COUNT
        var totalCount = await projectedQuery.CountAsync(ct);

        // 📄 PAGINATION
        var items = await projectedQuery
            .Skip(request.SkipCount)
            .Take(request.PageSize)
            .ToListAsync(ct);

        return new PageResult<ListFilmQueryDto>
        {
            Total = totalCount,
            Items = items
        };
    }
}
