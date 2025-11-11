

using CineMart.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CineMart.Domain.Entities.Identity
{
    public class ChatMessageEntity:BaseEntity
    {
        public int Id { get; set; }

        public required int  SenderId { get; set; }

        public required int ReceiverId { get; set; }

        public string? MessageText { get; set; }

        public DateTime SentAt { get; set; } = DateTime.Now;

        public bool IsRead { get; set; } = false;

        public string? MessageType { get; set; }

        public virtual UserEntity? Sender { get; set; }
        public virtual UserEntity? Receiver { get; set; }
    }
}
