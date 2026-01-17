using MediatR;
using Microsoft.EntityFrameworkCore;
namespace CineMart.Application.Modules.Sales.CartItem.Queries.GetByUserId;
public class ListCartItemsByUserIdQueryHandler
    : IRequestHandler<ListCartItemsByUserIdQuery, List<ListCartItemsByUserIdQueryDto>>
{
    private readonly IAppDbContext _ctx;
    public ListCartItemsByUserIdQueryHandler(IAppDbContext ctx)
    {
        _ctx = ctx;
    }
    public async Task<List<ListCartItemsByUserIdQueryDto>> Handle(
        ListCartItemsByUserIdQuery request,
        CancellationToken ct)
    {
        return await _ctx.CartItems
            .Where(x => x.UserId == request.UserId)
            .Select(x => new ListCartItemsByUserIdQueryDto
            {
                Id = x.Id,
                Name = x.Film != null
                    ? x.Film.Title
                    : x.Product!.Name,
                IsFilm = x.Film != null,
                IsRent = x.Film != null && x.IsRent,
                Quantity = x.Quantity,
                Price = x.Film != null
                    ? (x.IsRent
                        ? x.Film.RentPrice
                        : x.Film.PurchasePrice)
                    : x.Product!.Price ?? 0m,
                TotalPrice = x.TotalPrice,
                Note = x.Note,
                PictureUrl = x.Film.PictureUrl,
                ImageUrl = x.Product.ImageUrl,
                FilmId = x.FilmId,
                ProductId = x.ProductId
            })
            .ToListAsync(ct);
    }
}