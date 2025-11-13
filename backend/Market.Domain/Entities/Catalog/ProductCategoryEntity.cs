using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Catalog;


public class ProductCategoryEntity : BaseEntity
{

    public string Name { get; set; }

    public string? Description { get; set; }

    public int ProductCount { get; set; } = 0;
    public bool IsEnabled { get; set; }

    public virtual ICollection<ProductEntity> Products { get; set; } = new List<ProductEntity>();
    public static class Constraints
    {
        public const int NameMaxLength = 100;
        public const int NationalityMaxLength = 100;
    }
}


