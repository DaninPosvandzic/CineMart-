using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Sales;

public class OrderStatusEntity : BaseEntity
{
    public string Name { get; set; }

    public string Description { get; set; }

}