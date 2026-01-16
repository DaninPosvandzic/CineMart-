using MediatR;

namespace CineMart.Application.Modules.ProductManagement.Products.Queries.ListByUser;

public class ListProductsByUserQuery : IRequest<List<ListProductsByUserQueryDto>>
{
    public int UserId { get; set; }
}
