using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Catalog;

/// <summary>
/// Represents a product in the system.
/// </summary>
public class ProductEntity : BaseEntity
{

    public string Name { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public string? ImageUrl { get; set; }

    public int? CategoryId { get; set; }
    public ProductCategoryEntity? Category { get; set; }

    public int StockQuantity { get; set; } = 0;

    public decimal AverageRating { get; set; } = 0;

    public bool OnSale { get; set; } = false;


    public static class Constraints
    {
        public const int NameMaxLength = 150;

        public const int DescriptionMaxLength = 1000;
    }
}

