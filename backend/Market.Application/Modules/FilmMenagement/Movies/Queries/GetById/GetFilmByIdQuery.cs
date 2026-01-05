
namespace CineMart.Application.Modules.FilmManagement.Queries.GetById;

public sealed record GetFilmByIdQuery : IRequest<GetFilmByIdQueryDto>
{
    public int Id { get; set; }

}