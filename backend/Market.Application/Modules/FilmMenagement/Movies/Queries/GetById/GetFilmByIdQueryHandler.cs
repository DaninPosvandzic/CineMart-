using CineMart.Application.Modules.FilmManagement.Queries.GetById;

namespace CineMart.Application.Modules.FilmManagement.Queries.GetById
{
    public sealed class GetFilmByIdQueryHandler : IRequestHandler<GetFilmByIdQuery, GetFilmByIdQueryDto>
    {
        private readonly IAppDbContext _ctx;
        public GetFilmByIdQueryHandler(IAppDbContext ctx) => _ctx = ctx;

        public async Task<GetFilmByIdQueryDto> Handle(GetFilmByIdQuery request, CancellationToken ct)
        {
            var filmDto = await _ctx.Films
                .AsNoTracking()
                .Include(f => f.Genre)
                .Include(f => f.Ratings)
                    .ThenInclude(r => r.User)
                .Where(f => f.Id == request.Id)
                .Select(f => new GetFilmByIdQueryDto
                {
                    Id = f.Id,
                    Title = f.Title,
                    ReleaseYear = f.ReleaseYear,
                    PurchasePrice = f.PurchasePrice,
                    RentPrice = f.RentPrice,
                    PictureUrl = f.PictureUrl,
                    GenreName = f.Genre != null ? f.Genre.Name : null,
                    AverageRating = f.Ratings.Any() ? f.Ratings.Average(r => (double?)r.RatingValue) : 0,
                    ViewCount = f.ViewCount,
                    Comments = f.Ratings
                        .Select(r => new GetFilmByIdQueryDto.CommentDto
                        {
                            User = r.User != null ? r.User.FirstName : "Anonymous",
                            Rating = r.RatingValue,
                            Text = r.Comment,
                            Date = r.DateAdded
                        })
                        .OrderByDescending(c => c.Date) // najnoviji prvi
                        .ToList()
                })
                .FirstOrDefaultAsync(ct);

            if (filmDto == null)
                throw new KeyNotFoundException($"Film with Id {request.Id} not found.");

            return filmDto;
        }
    }

}
