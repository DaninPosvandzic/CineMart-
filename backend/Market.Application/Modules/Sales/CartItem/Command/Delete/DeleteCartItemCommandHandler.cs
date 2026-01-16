using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.Sales.CartItem.Command.Delete
{
    public class DeleteCartItemCommandHandler : IRequestHandler<DeleteCartItemCommand, Unit>
    {
        private readonly IAppDbContext _context;

        public DeleteCartItemCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteCartItemCommand request, CancellationToken cancellationToken)
        {
            var item = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.Id == request.CartItemId && ci.UserId == request.UserId, cancellationToken);

            if (item != null)
            {
                _context.CartItems.Remove(item);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}
