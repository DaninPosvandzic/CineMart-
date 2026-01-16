using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.Sales.CartItem.Command.Clear
{
    public class ClearCartItemCommandHandler : IRequestHandler<ClearCartItemCommand, Unit>
    {
        private readonly IAppDbContext _context;

        public ClearCartItemCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(ClearCartItemCommand request, CancellationToken cancellationToken)
        {
            var items = await _context.CartItems
                .Where(ci => ci.UserId == request.UserId)
                .ToListAsync(cancellationToken);

            if (items.Any())
            {
                _context.CartItems.RemoveRange(items);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}
