
using CineMart.Domain.Entities;


namespace CineMart.Application.Modules.Sales.CartItem.Commands.Create;

public class CreateCartItemCommandHandler : IRequestHandler<CreateCartItemCommand, int>
{
    private readonly IAppDbContext _ctx;
    private readonly IAppCurrentUser _currentUser;

    public CreateCartItemCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    {
        _ctx = ctx;
        _currentUser = currentUser;
    }

    public async Task<int> Handle(CreateCartItemCommand request, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException("User not logged in");

        if (request.FilmId == null && request.ProductId == null)
            throw new ArgumentException("Either FilmId or ProductId must be set");

        if (request.FilmId != null && request.ProductId != null)
            throw new ArgumentException("Only one of FilmId or ProductId can be set");

        decimal unitPrice;

        if (request.FilmId != null)
        {
            var film = await _ctx.Films.FirstOrDefaultAsync(f => f.Id == request.FilmId, ct);
            if (film == null) throw new KeyNotFoundException("Film not found");

            unitPrice = request.IsRent ? film.RentPrice : film.PurchasePrice;
        }
        else
        {
            var product = await _ctx.Products.FirstOrDefaultAsync(p => p.Id == request.ProductId, ct);
            if (product == null) throw new KeyNotFoundException("Product not found");

            unitPrice = (decimal)product.Price;
        }

        // Provjera da li item već postoji
        var existing = await _ctx.CartItems.FirstOrDefaultAsync(x =>
            x.UserId == userId &&
            x.FilmId == request.FilmId &&
            x.ProductId == request.ProductId &&
            x.IsRent == request.IsRent, ct);

        if (existing != null)
        {
            existing.Quantity += request.Quantity;
            existing.TotalPrice = existing.Quantity * unitPrice;

            if (!string.IsNullOrEmpty(request.Note))
                existing.Note = request.Note;

            await _ctx.SaveChangesAsync(ct);
            return existing.Id;
        }

        // Novi item
        var cartItem = new CartItemEntity
        {
            UserId = userId,
            FilmId = request.FilmId,
            ProductId = request.ProductId,
            Quantity = request.Quantity,
            TotalPrice = unitPrice * request.Quantity,
            Note = request.Note,
            AddedDate = DateTime.UtcNow,
            IsRent = request.IsRent
        };

        _ctx.CartItems.Add(cartItem);
        await _ctx.SaveChangesAsync(ct);

        return cartItem.Id;
    }
}
