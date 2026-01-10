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
            var rating = await _context.Ratings.FirstOrDefaultAsync(
                r => r.FilmId == request.MovieId && r.UserId == request.UserId,
                cancellationToken);

            if (rating == null)
            {
                rating = new RatingEntity
                {
                    FilmId = request.MovieId,
                    UserId = request.UserId,
                    RatingValue = request.Value,
                    Comment = request.Comment,
                    DateAdded = DateTime.UtcNow
                };

                _context.Ratings.Add(rating);
            }
            else
            {
                rating.RatingValue = request.Value;

                if (!string.IsNullOrWhiteSpace(request.Comment))
                {
                    rating.Comment = request.Comment;
                    rating.IsEdited = true;
                    rating.ModifiedAtUtc = DateTime.UtcNow;
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            // Update average rating
            var avg = await _context.Ratings
                .Where(r => r.FilmId == request.MovieId && !r.IsDeleted)
                .AverageAsync(r => r.RatingValue, cancellationToken);

            var movie = await _context.Films
                .FirstAsync(f => f.Id == request.MovieId, cancellationToken);

            movie.AverageRating = avg;
            movie.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }

}
