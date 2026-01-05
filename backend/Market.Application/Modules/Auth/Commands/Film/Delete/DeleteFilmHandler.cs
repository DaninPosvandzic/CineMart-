using CineMart.Application.Modules.Auth.Commands.Movie.DeleteMovie;
using MediatR;
using Microsoft.EntityFrameworkCore;

public sealed class DeleteFilmHandler
    : IRequestHandler<DeleteFilmCommand, Unit>
{
    private readonly IAppDbContext _db;

    public DeleteFilmHandler(IAppDbContext db)
    {
        _db = db;
    }

    public async Task<Unit> Handle(
        DeleteFilmCommand request,
        CancellationToken ct)
    {
        var film = await _db.Films
            .FirstOrDefaultAsync(f => f.Id == request.Id, ct);

        if (film is null)
            throw new KeyNotFoundException("Film not found");

        _db.Films.Remove(film);
        await _db.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
