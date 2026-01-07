

using CineMart.Application.Modules.FilmManagement.Genres.Queries.List;
using CineMart.Application.Modules.FilmMenagement.Genres.Queries.List;

[ApiController]
[Route("api/[controller]")]
public class GenreController(ISender sender) : ControllerBase
{
    // GET /genre/GetAll
    [AllowAnonymous]
    [HttpGet("GetAll")]
    public async Task<List<ListGenreQueryDto>> List(
        [FromQuery] ListGenreQuery query,
        CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }
}