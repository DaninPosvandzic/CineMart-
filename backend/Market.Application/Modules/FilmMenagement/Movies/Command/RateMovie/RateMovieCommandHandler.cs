using CineMart.Application.Abstractions;
using CineMart.Domain.Entities.UserInteraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.FilmMenagement.Movies.Command.RateMovie
{
    public class RateMovieCommandHandler : IRequestHandler<RateMovieCommand, Unit>
    {
        private readonly IAppDbContext _context;

        public RateMovieCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RateMovieCommand request, CancellationToken cancellationToken)
        {
            var exists = await _context.Ratings
                .AnyAsync(r =>
                    r.FilmId == request.MovieId &&
                    r.UserId == request.UserId,
                    cancellationToken);

            if (exists)
                throw new ValidationException("Movie already rated by this user");

            _context.Ratings.Add(new RatingEntity
            {
                FilmId = request.MovieId,
                UserId = request.UserId,
                RatingValue = request.Value
            });

            await _context.SaveChangesAsync(cancellationToken);

            // Update prosjeka
            var avg = await _context.Ratings
                .Where(r => r.FilmId == request.MovieId)
                .AverageAsync(r => r.RatingValue, cancellationToken);

            var movie = await _context.Films
                .FirstAsync(f => f.Id == request.MovieId, cancellationToken);

            movie.AverageRating = avg;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

    }

}
