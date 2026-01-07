using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.FilmMenagement.Directors.Queries.List
{
    public class ListDirectorQueryHandler : IRequestHandler<ListDirectorQuery, List<ListDirectorQueryDto>>
    {
        private readonly IAppDbContext _ctx;

        public ListDirectorQueryHandler(IAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<ListDirectorQueryDto>> Handle(ListDirectorQuery request, CancellationToken ct)
        {
            var query = _ctx.Directors.AsQueryable();

            // Projekcija u DTO
            var directors = await query
                .Select(d => new ListDirectorQueryDto
                {
                    Id = d.Id,
                    FirstName = d.FirstName,
                    LastName = d.LastName,
                    DateOfBirth = d.DateOfBirth,
                    CountryOfOrigin = d.CountryOfOrigin,
                    FilmCount = d.FilmCount
                })
                .ToListAsync(ct);

            return directors;
        }
    }
}