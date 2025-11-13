
using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.Identity
{
    public class RollEntity:BaseEntity
    {
        public string Name { get; set; }

        public string? Description { get; set; }

        public virtual ICollection<UserEntity> Users { get; set; } = new List<UserEntity>();
    }

}

