using MediatR;

namespace CineMart.Application.Modules.FilmManagement.Movies.Command.Create
{
    public class CreateFilmCommand : IRequest<int>
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ReleaseYear { get; set; }
        public string? TrailerUrl { get; set; }
        public string? PictureUrl { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal RentPrice { get; set; }
        public int? GenreId { get; set; }
        public int? DirectorId { get; set; }
    }
}
