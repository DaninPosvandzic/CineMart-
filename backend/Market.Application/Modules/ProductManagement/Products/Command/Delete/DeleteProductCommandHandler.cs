using CineMart.Domain.Entities.Catalog;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.ProductManagement.Products.Command.Delete;

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Unit>
{
    private readonly IAppDbContext _ctx;

    public DeleteProductCommandHandler(IAppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken ct)
    {
        var product = await _ctx.Products
            .FirstOrDefaultAsync(p => p.Id == request.Id, ct);

        if (product == null)
            throw new KeyNotFoundException("Product not found");

        _ctx.Products.Remove(product);
        await _ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
