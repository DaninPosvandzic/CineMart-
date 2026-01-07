using CineMart.Application.Modules.FilmManagement.Movies.Command.Create;
using CineMart.Application.Modules.FilmManagement.Movies.Command.Delete;
using CineMart.Application.Modules.FilmManagement.Queries.GetById;
using CineMart.Application.Modules.FilmManagement.Queries.List;

[ApiController]
[Route("[controller]")]
public class FilmController(ISender sender) : ControllerBase
{
    // GET /film
    [AllowAnonymous]
    [HttpGet("GetAll")]
    public async Task<PageResult<ListFilmQueryDto>> List(
        [FromQuery] ListFilmQuery query,
        CancellationToken ct)
    {
        return await sender.Send(query, ct); // koristi sender iz primary constructor
    }

    [AllowAnonymous]
    [HttpGet("{id:int}")]
    public async Task<GetFilmByIdQueryDto> GetFilm(int id, CancellationToken ct)
    {
        return await sender.Send(new GetFilmByIdQuery { Id = id }, ct);
    }

    [AllowAnonymous] // kasnije pravi user
    [HttpGet("User/{userId:int}")]
    public async Task<List<ListFilmsByUserQueryDto>> GetByUser(
    int userId,
    CancellationToken ct)
    {
        return await sender.Send(
            new ListFilmsByUserQuery { UserId = userId },
            ct
        );
    }

    [Authorize]
    [HttpPost("Create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateFilmCommand command, CancellationToken ct)
    {
        var filmId = await sender.Send(command, ct);
        return Ok(filmId);
    }

    [AllowAnonymous]
    [HttpDelete("{id:int}")]
    public async Task Delete(int id, CancellationToken ct)
    {
        await sender.Send(new DeleteFilmCommand { Id = id }, ct); // koristi sender
    }
}
