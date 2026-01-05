namespace CineMart.Application.Modules.FilmManagement.Queries.GetById;

public sealed class GetFilmByIdQueryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public decimal PurchasePrice { get; set; }
    public string PictureUrl { get; set; }
    public decimal RentPrice { get; set; }
    public string? GenreName { get; set; }
    public double? AverageRating { get; set; }
    public int ViewCount { get; set; }
}