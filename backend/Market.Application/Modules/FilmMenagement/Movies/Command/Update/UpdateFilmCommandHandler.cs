using CineMart.Application.Modules.FilmMenagement.Movies.Command.Update;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class UpdateFilmCommandHandler : IRequestHandler<UpdateFilmCommand, Unit>
{
    private readonly IAppDbContext _context;

    public UpdateFilmCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateFilmCommand request, CancellationToken cancellationToken)
    {
        var film = await _context.Films.FindAsync(new object?[] { request.Id }, cancellationToken);
        if (film == null)
            throw new KeyNotFoundException("Film not found");

        // Admin check
        if (request.Role != "Admin")
            throw new UnauthorizedAccessException("Only admins can edit films");

        film.Title = request.Title;
        film.Description = request.Description;
        film.RentPrice = request.RentPrice;
        film.ReleaseYear = request.ReleaseYear;
        film.PurchasePrice = request.PurchasePrice;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
