using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.ProductManagement.Products.Queries.GetById;

public sealed class GetProductByIdQueryHandler(IAppDbContext ctx)
    : IRequestHandler<GetProductByIdQuery, GetProductByIdQueryDto>
{
    public async Task<GetProductByIdQueryDto> Handle(
        GetProductByIdQuery request,
        CancellationToken ct)
    {
        var product = await ctx.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.Id == request.Id)
            .Select(p => new GetProductByIdQueryDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
                CategoryName = p.Category != null ? p.Category.Name : null,
                StockQuantity = p.StockQuantity,
                AverageRating = p.AverageRating
            })
            .FirstOrDefaultAsync(ct);

        if (product == null)
            throw new KeyNotFoundException($"Product with Id {request.Id} not found.");

        return product;
    }
}