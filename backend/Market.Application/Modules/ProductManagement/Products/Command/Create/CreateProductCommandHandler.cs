using CineMart.Domain.Entities.Catalog;
using MediatR;

namespace CineMart.Application.Modules.ProductManagement.Products.Command.Create;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
{
    private readonly IAppDbContext _ctx;
    private readonly IAppCurrentUser _currentUser;

    public CreateProductCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    {
        _ctx = ctx;
        _currentUser = currentUser;
    }

    public async Task<int> Handle(CreateProductCommand request, CancellationToken ct)
    {
        var product = new ProductEntity
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            ImageUrl = request.ImageUrl,
            CategoryId = request.CategoryId,
            StockQuantity = request.StockQuantity,
            AverageRating = 0,
        };

        // Optional: if you track user who added product
        if (_currentUser.UserId.HasValue)
        {
            product.UserId = _currentUser.UserId.Value; // Ako postoji UserId u ProductEntity
        }

        _ctx.Products.Add(product);
        await _ctx.SaveChangesAsync(ct);

        return product.Id;
    }
}

