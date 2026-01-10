using CineMart.Domain.Common;
using CineMart.Domain.Entities.Identity;
using CineMart.Domain.Entities.UserInteraction;

namespace CineMart.Domain.Entities.FilmManagement;
public class FilmEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }

    public int ReleaseYear { get; set; }

    public string? TrailerUrl { get; set; }
    public string? PictureUrl { get; set; }

    public decimal PurchasePrice { get; set; }

    public decimal RentPrice { get; set; }

    public int? GenreId { get; set; }
    public GenreEntity? Genre { get; set; }
    public int? DirectorId { get; set; }
    public DirectorEntity? Director { get; set; }
    public double? AverageRating { get; set; }
    public int ViewCount { get; set; }
    public DateTime DateAdded { get; set; }
    public int UserId { get; set; }
    public UserEntity User { get; set; }

    public static class Constraints
    {
        public const int NameMaxLength = 150;
        public const int DescriptionMaxLength = 1000;
    }
    public ICollection<RatingEntity> Ratings { get; set; } = new List<RatingEntity>();
}

