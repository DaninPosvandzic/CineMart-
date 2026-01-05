using MediatR;

namespace CineMart.Application.Modules.FilmManagement.Movies.Command.Delete
{
    public class DeleteFilmCommand : IRequest<Unit>
    {
        public required int Id { get; set; }
    }
}
