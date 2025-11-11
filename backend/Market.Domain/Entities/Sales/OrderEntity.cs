using CineMart.Domain.Common;
using CineMart.Domain.Entities.Identity;

namespace CineMart.Domain.Entities.Sales;

/// <summary>
/// Represents a product in the system.
/// </summary>
public class OrderEntity : BaseEntity
{
    public int UserId { get; set; }
    public CineMartUserEntity? User { get; set; }

    public DateTime OrderDate { get; set; }

    public decimal TotalAmount { get; set; }

    // FK prema statusu
    public int OrderStatusId { get; set; }
    public OrderStatusEntity? OrderStatus { get; set; }

    // FK prema promo kodu (može biti nullable)
    public int? PromoCodeId { get; set; }
    public PromoCodeEntity? PromoCode { get; set; }

    public int TotalItems { get; set; }

    public DateTime? DeliveryDate { get; set; }

    /// <summary>
    /// Single source of truth for technical/business constraints.
    /// Used in validators and EF configuration.
    /// </summary>
    public static class Constraints
    {
        public const int NameMaxLength = 150;

        public const int DescriptionMaxLength = 1000;
    }
}