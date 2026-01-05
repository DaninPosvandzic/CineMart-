using CineMart.Domain.Entities.FilmManagement;
using MediatR;
using Microsoft.EntityFrameworkCore;

public sealed class CreateFilmHandler
    : IRequestHandler<CreateFilmDto, FilmDto>
{
    private readonly IAppDbContext _db;

    public CreateFilmHandler(IAppDbContext db)
    {
        _db = db;
    }

    public async Task<FilmDto> Handle(
        CreateFilmDto request,
        CancellationToken ct)
    {
        var film = new FilmEntity
        {
            Title = request.Title,
            ReleaseYear = request.ReleaseYear,
            PurchasePrice = request.PurchasePrice,
            RentPrice = request.RentPrice,
            DateAdded = DateTime.UtcNow
        };

        // ✅ OVO JE await
        await _db.Films.AddAsync(film, ct);

        // ✅ OVO JE await
        await _db.SaveChangesAsync(ct);

        return new FilmDto
        {
            Id = film.Id,
            Title = film.Title,
            ReleaseYear = film.ReleaseYear,
            PurchasePrice = film.PurchasePrice,
            RentPrice = film.RentPrice
        };
    }
}
