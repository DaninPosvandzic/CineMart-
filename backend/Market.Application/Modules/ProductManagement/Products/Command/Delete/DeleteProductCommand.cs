using MediatR;

namespace CineMart.Application.Modules.ProductManagement.Products.Command.Delete;

public class DeleteProductCommand : IRequest<Unit>
{
    public int Id { get; init; }
}

