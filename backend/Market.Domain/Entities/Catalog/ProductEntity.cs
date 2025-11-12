using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Catalog;

/// <summary>
/// Represents a product in the system.
/// </summary>
public class ProductEntity : BaseEntity
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public string? ImageUrl { get; set; }

    public int? CategoryId { get; set; }

    public int StockQuantity { get; set; } = 0;

    public DateTime DateAdded { get; set; } = DateTime.Now;

    public decimal AverageRating { get; set; } = 0;

    public bool OnSale { get; set; } = false;

    public virtual CategoryEntity? Category { get; set; }
}

