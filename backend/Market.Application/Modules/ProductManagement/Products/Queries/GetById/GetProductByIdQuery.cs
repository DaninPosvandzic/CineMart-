using MediatR;

namespace CineMart.Application.Modules.ProductManagement.Products.Queries.GetById;

public sealed record GetProductByIdQuery : IRequest<GetProductByIdQueryDto>
{
    public int Id { get; set; }
}
