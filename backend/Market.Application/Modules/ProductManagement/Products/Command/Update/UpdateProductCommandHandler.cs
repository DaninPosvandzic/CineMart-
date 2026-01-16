using CineMart.Domain.Entities.Catalog;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.ProductManagement.Products.Command.Update;

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Unit>
{
    private readonly IAppDbContext _ctx;

    public UpdateProductCommandHandler(IAppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken ct)
    {
        var product = await _ctx.Products.FindAsync(new object?[] { request.Id }, ct);

        if (product == null)
            throw new KeyNotFoundException("Product not found");

        // Only admins can edit products
        if (request.Role != "Admin")
            throw new UnauthorizedAccessException("Only admins can edit products");

        product.Name = request.Name;
        product.Description = request.Description;
        product.Price = request.Price;
        product.CategoryId = request.CategoryId;
        product.StockQuantity = request.StockQuantity;

        await _ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}

