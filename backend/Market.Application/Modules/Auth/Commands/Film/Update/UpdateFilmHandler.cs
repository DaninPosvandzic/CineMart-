using CineMart.Application.Modules.Auth.Commands.Film.Update;

public sealed class UpdateFilmHandler
    : IRequestHandler<UpdateFilmCommand, FilmDto>
{
    private readonly IAppDbContext _db;

    public UpdateFilmHandler(IAppDbContext db)
    {
        _db = db;
    }

    public async Task<FilmDto> Handle(
        UpdateFilmCommand request,
        CancellationToken ct)
    {
        var film = await _db.Films
            .FirstOrDefaultAsync(f => f.Id == request.Id, ct);

        if (film is null)
            throw new KeyNotFoundException("Film not found");

        film.Title = request.Title;
        film.ReleaseYear = request.ReleaseYear;
        film.PurchasePrice = request.PurchasePrice;
        film.RentPrice = request.RentPrice;

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
