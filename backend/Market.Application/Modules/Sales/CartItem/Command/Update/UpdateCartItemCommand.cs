using MediatR;

namespace CineMart.Application.Modules.Sales.CartItem.Command.Update
{
    public class UpdateCartItemCommand : IRequest<Unit>
    {
        public int CartItemId { get; }
        public int UserId { get; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        public UpdateCartItemCommand(int cartItemId, int userId, int quantity, decimal totalPrice)
        {
            CartItemId = cartItemId;
            UserId = userId;
            Quantity = quantity;
            TotalPrice = totalPrice;
        }
    }
}
