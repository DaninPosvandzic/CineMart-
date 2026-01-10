// MarketUserEntity.cs
using CineMart.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;
using CineMart.Domain.Entities.Catalog;

namespace CineMart.Domain.Entities.Identity;

public  class UserEntity : BaseEntity
{
  
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Status { get; set; } = "active";
    public string? ProfileImageUrl { get; set; }
    public DateTime? LastLogin { get; set; }
    public int OrderCount { get; set; } = 0;
    public int RollId { get; set; }
    public virtual RollEntity? Roll { get; set; }
    public bool IsEnabled { get; set; }
    public int TokenVersion { get; set; } = 0;
    public ICollection<RefreshTokenEntity> RefreshTokens { get; private set; } = new List<RefreshTokenEntity>();
  
}




