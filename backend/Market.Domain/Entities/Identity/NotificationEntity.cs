

using CineMart.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CineMart.Domain.Entities.Identity
{
    public class NotificationEntity:BaseEntity
    {

        public int UserId { get; set; }
        public UserEntity? User { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
        public bool IsRead { get; set; } = false;
        public string? NotificationType { get; set; }
        public string? Priority { get; set; }

    }
}
