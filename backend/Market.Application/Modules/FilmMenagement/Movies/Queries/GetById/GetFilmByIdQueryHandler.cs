using CineMart.Application.Modules.FilmManagement.Queries.GetById;

namespace CineMart.Application.Modules.FilmManagement.Queries.GetById
{
    public sealed class GetFilmByIdQueryHandler(IAppDbContext ctx)
        : IRequestHandler<GetFilmByIdQuery, GetFilmByIdQueryDto>
    {
        public async Task<GetFilmByIdQueryDto> Handle(GetFilmByIdQuery request, CancellationToken ct)
        {
            var filmDto = await ctx.Films
                .AsNoTracking()
                .Include(f => f.Genre) 
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
                    AverageRating = f.AverageRating,
                    ViewCount = f.ViewCount
                })
                .FirstOrDefaultAsync(ct);

            if (filmDto == null)
            {
                throw new KeyNotFoundException($"Film with Id {request.Id} not found.");
            }

            return filmDto;
        }
    }
}
