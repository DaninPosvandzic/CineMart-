using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.ProductManagement.Products.Queries.List;

public sealed class ListProductQueryHandler
    : IRequestHandler<ListProductQuery, PageResult<ListProductQueryDto>>
{
    private readonly IAppDbContext _ctx;

    public ListProductQueryHandler(IAppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<PageResult<ListProductQueryDto>> Handle(
        ListProductQuery request,
        CancellationToken ct)
    {
        var query = _ctx.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .AsQueryable();

        // 🔎 SEARCH
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(term));
        }

        // 🔀 SORT
        query = request.SortBy?.ToLower() switch
        {
            "price" => request.SortDir == "desc"
                ? query.OrderByDescending(p => p.Price)
                : query.OrderBy(p => p.Price),

            _ => request.SortDir == "desc"
                ? query.OrderByDescending(p => p.Name)
                : query.OrderBy(p => p.Name)
        };

        var projected = query.Select(p => new ListProductQueryDto
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            ImageUrl = p.ImageUrl,
            CategoryName = p.Category != null ? p.Category.Name : null,
            AverageRating = p.AverageRating
        });

        var total = await projected.CountAsync(ct);

        var items = await projected
            .Skip(request.SkipCount)
            .Take(request.PageSize)
            .ToListAsync(ct);

        return new PageResult<ListProductQueryDto>
        {
            Total = total,
            Items = items
        };
    }
}
