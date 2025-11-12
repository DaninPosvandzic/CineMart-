using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Catalog;


public class CategoryEntity : BaseEntity
{
   
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int ProductCount { get; set; } = 0;

        public virtual ICollection<ProductEntity> Products { get; set; } = new List<ProductEntity>();
}

    
