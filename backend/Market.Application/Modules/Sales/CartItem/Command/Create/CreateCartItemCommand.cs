using MediatR;

namespace CineMart.Application.Modules.Sales.CartItem.Commands.Create;

public class CreateCartItemCommand : IRequest<int>
{
    public int UserId { get; set; }
    public int? FilmId { get; set; }
    public int? ProductId { get; set; }
    public bool IsRent { get; set; } = false; // true = rent, false = buy
    public int Quantity { get; set; } = 1;
    public string? Note { get; set; }
}