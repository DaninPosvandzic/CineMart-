using CineMart.Domain.Common;
using CineMart.Domain.Entities.FilmManagement;
using CineMart.Domain.Entities.Sales;

namespace CineMart.Domain.Entities;
public class OrderItemFilmEntity : BaseEntity
{
    public int OrderId { get; set; }
    public OrderEntity Order { get; set; } = null!;
    public int? FilmId { get; set; }
    public FilmEntity? Film { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal? Discount { get; set; }
    public string? Note { get; set; }

    // Optional navigation properties
}