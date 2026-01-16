using MediatR;
using System.Collections.Generic;

namespace CineMart.Application.Modules.Sales.CartItem.Queries.GetByUserId;

public class ListCartItemsByUserIdQuery : IRequest<List<ListCartItemsByUserIdQueryDto>>
{
    public int UserId { get; set; }
}
