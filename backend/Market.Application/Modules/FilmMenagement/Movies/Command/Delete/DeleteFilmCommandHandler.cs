using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.FilmManagement.Movies.Command.Delete
{
    public class DeleteFilmCommandHandler : IRequestHandler<DeleteFilmCommand, Unit>
    {
        private readonly IAppDbContext _context;

        public DeleteFilmCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteFilmCommand request, CancellationToken cancellationToken)
        {
            var film = await _context.Films
                .FirstOrDefaultAsync(f => f.Id == request.Id, cancellationToken);

            if (film is null)
                throw new KeyNotFoundException($"Film sa ID {request.Id} nije pronađen.");

            _context.Films.Remove(film);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
