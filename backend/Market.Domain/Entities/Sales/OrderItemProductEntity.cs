using CineMart.Domain.Common;
using CineMart.Domain.Entities.Catalog;
using CineMart.Domain.Entities.Sales;

namespace CineMart.Domain.Entities;

public class OrderItemProductEntity : BaseEntity
{
    public int OrderId { get; set; }
    public OrderEntity Order { get; set; } = null!;
    public int? ProductId { get; set; }
    public ProductEntity? Product { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal? Discount { get; set; }
    public string? Note { get; set; }

}