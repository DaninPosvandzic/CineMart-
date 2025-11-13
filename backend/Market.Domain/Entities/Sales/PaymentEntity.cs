using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Sales;

public class PaymentEntity : BaseEntity
{
    public int OrderId { get; set; }
    public OrderEntity? Order { get; set; }

    public decimal Amount { get; set; }

    public string PaymentMethod { get; set; } = default!;

    public DateTime PaymentDate { get; set; }

    public int PaymentStatusId { get; set; }
    public PaymentStatusEntity? PaymentStatus { get; set; }

    public string TransactionCode { get; set; } = default!;
}