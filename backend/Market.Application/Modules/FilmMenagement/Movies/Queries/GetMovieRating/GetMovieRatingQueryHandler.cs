using CineMart.Application.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.FilmMenagement.Movies.Queries.GetMovieRating
{
    public class GetMovieRatingQueryHandler : IRequestHandler<GetMovieRatingQuery, MovieRatingDto>
    {
        private readonly IAppDbContext _context;

        public GetMovieRatingQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<MovieRatingDto> Handle(
        GetMovieRatingQuery request,
        CancellationToken ct)
        {
            var ratings = _context.Ratings
                .Where(r => r.FilmId == request.MovieId);

            var average = await ratings.AnyAsync(ct)
                ? await ratings.AverageAsync(r => r.RatingValue, ct)
                : 0;

            var votes = await ratings.CountAsync(ct);

            var userRating = await ratings
                .Where(r => r.UserId == request.UserId)
                .Select(r => (int?)r.RatingValue)
                .FirstOrDefaultAsync(ct);

            return new MovieRatingDto
            {
                Average = average,
                Votes = votes,
                UserRating = userRating
            };
        }

    }

}
