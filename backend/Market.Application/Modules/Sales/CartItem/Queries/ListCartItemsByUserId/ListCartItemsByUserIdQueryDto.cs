namespace CineMart.Application.Modules.Sales.CartItem.Queries.GetByUserId;

public class ListCartItemsByUserIdQueryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public bool IsFilm { get; set; }
    public bool IsRent { get; set; }   // samo relevantno za film
    public int Quantity { get; set; }
    public decimal Price { get; set; }  // jedinična cijena
    public decimal TotalPrice { get; set; }
    public string? Note { get; set; }

    public string? PictureUrl { get; set; }  // Za filmove
    public string? ImageUrl { get; set; }

    public int? FilmId { get; set; }
    public int? ProductId { get; set; }
}
