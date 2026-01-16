using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.Sales.CartItem.Command.Update
{
    public class UpdateCartItemCommandHandler : IRequestHandler<UpdateCartItemCommand, Unit>
    {
        private readonly IAppDbContext _context;

        public UpdateCartItemCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateCartItemCommand request, CancellationToken cancellationToken)
        {
            var item = await _context.CartItems
                .Include(ci => ci.Film)     // Film može biti null
                .Include(ci => ci.Product)  // Product može biti null
                .FirstOrDefaultAsync(ci => ci.Id == request.CartItemId && ci.UserId == request.UserId, cancellationToken);

            if (item == null)
                return Unit.Value;

            item.Quantity = request.Quantity;

            // Računanje totalPrice
            if (item.Film != null) // stavka je film
            {
                if (request.Quantity < 0)
                    request.Quantity = 0;

                if (request.Quantity > 0 && item.IsRent) // ako je rent
                    item.TotalPrice = item.Film.RentPrice * item.Quantity;
                else // kupovina
                    item.TotalPrice = item.Film.PurchasePrice * item.Quantity;
            }
            else if (item.Product != null) // stavka je proizvod
            {
                item.TotalPrice = (decimal)item.Product.Price * item.Quantity;
            }
            else
            {
                // fallback ako nema Film ni Product
                item.TotalPrice = 0;
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
