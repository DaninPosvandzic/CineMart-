using MediatR;
using Microsoft.EntityFrameworkCore;

public sealed class GetFilmsHandler
    : IRequestHandler<GetFilmsQuery, IReadOnlyList<FilmDto>>
{
    private readonly IAppDbContext _db;

    public GetFilmsHandler(IAppDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<FilmDto>> Handle(
        GetFilmsQuery request,
        CancellationToken ct)
    {
        return await _db.Films
            .AsNoTracking()
            .OrderByDescending(f => f.DateAdded)
            .Select(f => new FilmDto
            {
                Id = f.Id,
                Title = f.Title,
                ReleaseYear = f.ReleaseYear,
                PurchasePrice = f.PurchasePrice,
                RentPrice = f.RentPrice
            })
            .ToListAsync(ct);
    }
}
