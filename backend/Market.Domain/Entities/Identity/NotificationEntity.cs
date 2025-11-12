

using CineMart.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CineMart.Domain.Entities.Identity
{
    public class NotificationEntity:BaseEntity
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string? Title { get; set; }

        public string? Message { get; set; }

        public bool IsRead { get; set; } = false;

        public DateTime SentDate { get; set; } = DateTime.Now;

        public string? NotificationType { get; set; }

        public string? Priority { get; set; }

        public virtual UserEntity? User { get; set; }
    }
}
