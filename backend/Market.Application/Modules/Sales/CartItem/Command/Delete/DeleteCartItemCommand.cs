
namespace CineMart.Application.Modules.Sales.CartItem.Command.Delete
{
    // Komanda za brisanje jedne stavke iz cart-a
    public class DeleteCartItemCommand : IRequest<Unit>
    {
        public int CartItemId { get; }
        public int UserId { get; }

        public DeleteCartItemCommand(int cartItemId, int userId)
        {
            CartItemId = cartItemId;
            UserId = userId;
        }
    }
}