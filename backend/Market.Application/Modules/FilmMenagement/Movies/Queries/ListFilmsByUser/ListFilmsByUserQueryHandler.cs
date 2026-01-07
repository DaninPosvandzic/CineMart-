using MediatR;
using Microsoft.EntityFrameworkCore;

public class ListFilmsByUserQueryHandler
    : IRequestHandler<ListFilmsByUserQuery, List<ListFilmsByUserQueryDto>>
{
    private readonly IAppDbContext _ctx;

    public ListFilmsByUserQueryHandler(IAppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<List<ListFilmsByUserQueryDto>> Handle(
        ListFilmsByUserQuery request,
        CancellationToken cancellationToken)
    {
        return await _ctx.Films
            .Where(f => f.UserId == request.UserId)
            .Select(m => new ListFilmsByUserQueryDto
            {
                Id = m.Id,
                Title = m.Title,
                ImageUrl = m.PictureUrl!
            })
            .ToListAsync(cancellationToken);
    }
}
