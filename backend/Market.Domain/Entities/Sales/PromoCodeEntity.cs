using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Sales;

/// <summary>
/// Represents a PromoCode for a discount on an order.
/// </summary>
public class PromoCodeEntity : BaseEntity
{
    public string Code { get; set; }

    // Discount percentage (e.g., 10 means 10%)
    public int DiscountPercent { get; set; }

    public DateTime ExpirationDate { get; set; }

    // Max number of uses for this promo code
    public int MaxUsage { get; set; }

    // Current number of times this code has been used
    public int CurrentUsage { get; set; }

    // Determines whether the promo code is currently active
    public bool IsActive { get; set; }

}