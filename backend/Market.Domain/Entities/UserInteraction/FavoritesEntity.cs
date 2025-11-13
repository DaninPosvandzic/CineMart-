using CineMart.Domain.Common;
using CineMart.Domain.Entities.Catalog;
using CineMart.Domain.Entities.FilmManagement;
using CineMart.Domain.Entities.Identity;

namespace CineMart.Domain.Entities;

public class FavoritesEntity : BaseEntity
{
    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;
    public int? FilmId { get; set; }
    public FilmEntity? Film { get; set; }
    public int? ProductId { get; set; }
    public ProductEntity? Product { get; set; }
    public DateTime AddedDate { get; set; }
    public string? Note { get; set; }

    // Optional navigation properties
}