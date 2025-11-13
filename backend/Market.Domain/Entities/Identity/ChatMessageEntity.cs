

using CineMart.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CineMart.Domain.Entities.Identity
{
    public class ChatMessageEntity:BaseEntity
    {
        public int  SenderId { get; set; }
        public UserEntity? Sender {  get; set; }
        public int ReceiverId { get; set; }
        public UserEntity? Receiver { get; set; }
        public string? MessageText { get; set; }
        public bool IsRead { get; set; } = false;
        public string? MessageType { get; set; }

    }
}
