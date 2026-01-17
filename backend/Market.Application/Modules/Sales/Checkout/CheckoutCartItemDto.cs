namespace CineMart.Application.Modules.Sales.Checkout;

public class CheckoutCartItemDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public decimal Price { get; set; }
    public int Quantity { get; set; }

    public bool IsFilm { get; set; }
    public bool IsRent { get; set; }

    public int? FilmId { get; set; }
    public int? ProductId { get; set; }
}
