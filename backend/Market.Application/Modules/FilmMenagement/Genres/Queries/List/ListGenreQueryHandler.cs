using CineMart.Application.Modules.FilmMenagement.Genres.Queries.List;

namespace CineMart.Application.Modules.FilmManagement.Genres.Queries.List
{
    public class ListGenreQueryHandler
        : IRequestHandler<ListGenreQuery, List<ListGenreQueryDto>>
    {
        private readonly IAppDbContext _ctx;

        public ListGenreQueryHandler(IAppDbContext ctx)
        {
            _ctx = ctx;
        }

    public async Task<List<ListGenreQueryDto>> Handle(
            ListGenreQuery request,
            CancellationToken cancellationToken)
        {
            return await _ctx.Genres
                .AsNoTracking()
                .OrderBy(g => g.Name)
                .Select(g => new ListGenreQueryDto
                {
                    Id = g.Id,
                    Name = g.Name
                })
                .ToListAsync(cancellationToken);
        }
    }
}