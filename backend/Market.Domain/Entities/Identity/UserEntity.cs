// MarketUserEntity.cs
using CineMart.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;
using CineMart.Domain.Entities.Catalog;

namespace CineMart.Domain.Entities.Identity;

public  class UserEntity : BaseEntity
{

    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public DateTime RegistrationDate { get; set; } = DateTime.Now;

    public string Status { get; set; } = "active";

    public string? ProfileImageUrl { get; set; }

    public DateTime? LastLogin { get; set; }

    public int OrderCount { get; set; } = 0;

    public int RollId { get; set; }

    public virtual RollEntity? Roll { get; set; }
    public int TokenVersion { get; set; } = 0;
    public ICollection<RefreshTokenEntity> RefreshTokens { get; private set; } = new List<RefreshTokenEntity>();
    public virtual ICollection<ChatMessageEntity> SentMessages { get; set; } = new List<ChatMessageEntity>();
    public virtual ICollection<ChatMessageEntity> ReceivedMessages { get; set; } = new List<ChatMessageEntity>();

}




