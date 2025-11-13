using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Sales;

public class RefundEntity : BaseEntity
{
    public int PaymentId { get; set; }
    public PaymentEntity? Payment { get; set; }
    public decimal Amount { get; set; }
    public string Reason { get; set; } = default!;
    public DateTime RefundDate { get; set; }
    public string Status { get; set; }
}