using MediatR;

namespace CineMart.Application.Modules.Sales.CartItem.Command.Clear
{
    // MUST be public!
    public class ClearCartItemCommand : IRequest<Unit>
    {
        public int UserId { get; }

        public ClearCartItemCommand(int userId)
        {
            UserId = userId;
        }
    }
}
