using MediatR;
using Microsoft.EntityFrameworkCore;
using CineMart.Application.Abstractions;

namespace CineMart.Application.Modules.ProductManagement.ProductCategories.Queries.List
{
    public sealed class ListProductCategoryQueryHandler
        : IRequestHandler<ListProductCategoryQuery, List<ListProductCategoryDto>>
    {
        private readonly IAppDbContext _ctx;

        public ListProductCategoryQueryHandler(IAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<ListProductCategoryDto>> Handle(
            ListProductCategoryQuery request,
            CancellationToken ct)
        {
            return await _ctx.ProductCategories
                .AsNoTracking()
                .Select(c => new ListProductCategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    IsEnabled = c.IsEnabled
                })
                .ToListAsync(ct);
        }
    }
}


