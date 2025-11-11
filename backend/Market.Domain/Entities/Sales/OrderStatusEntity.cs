using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Sales;

/// <summary>
/// Represents a PromoCode for a discount on an order.
/// </summary>
public class OrderStatusEntity : BaseEntity
{
    public string Name { get; set; }

    public string Description { get; set; }

}