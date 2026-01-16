using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.ProductManagement.Products.Queries.ListByUser;

public class ListProductsByUserQueryHandler
    : IRequestHandler<ListProductsByUserQuery, List<ListProductsByUserQueryDto>>
{
    private readonly IAppDbContext _ctx;

    public ListProductsByUserQueryHandler(IAppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<List<ListProductsByUserQueryDto>> Handle(
        ListProductsByUserQuery request,
        CancellationToken ct)
    {
        return await _ctx.Products
            .Where(p => p.UserId == request.UserId)
            .Select(p => new ListProductsByUserQueryDto
            {
                Id = p.Id,
                Name = p.Name,
                ImageUrl = p.ImageUrl
            })
            .ToListAsync(ct);
    }
}
