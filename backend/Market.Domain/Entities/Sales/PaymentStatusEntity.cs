using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Sales;

public class PaymentStatusEntity : BaseEntity
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }

}