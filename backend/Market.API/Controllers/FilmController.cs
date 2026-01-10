using CineMart.Application.Modules.FilmManagement.Movies.Command.Create;
using CineMart.Application.Modules.FilmManagement.Movies.Command.Delete;
using CineMart.Application.Modules.FilmManagement.Queries.GetById;
using CineMart.Application.Modules.FilmManagement.Queries.List;
using CineMart.Application.Modules.FilmMenagement.Movies.Command.RateMovie;
using CineMart.Application.Modules.FilmMenagement.Movies.Command.Update;
using CineMart.Application.Modules.FilmMenagement.Movies.Queries.GetMovieRating;
using MediatR;
using System.Security.Claims;

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

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        await sender.Send(new DeleteFilmCommand { Id = id });
        return NoContent();
    }


    [Authorize]
    [HttpPost("{id}/rate")]
    public async Task<IActionResult> RateMovie(int id, [FromBody] RateMovieDto dto)
    {
        var userId = 1; // 🔴 kasnije iz JWT-a

        await sender.Send(new RateMovieCommand(id, userId, dto.Value));

        var result = await sender.Send(
            new GetMovieRatingQuery(id, userId)
        );

        return Ok(result);
    }

    [Authorize]
    [HttpGet("{id}/rating")]
    public async Task<IActionResult> GetRating(int id, CancellationToken ct)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var result = await sender.Send(
            new GetMovieRatingQuery(id, userId),
            ct
        );

        return Ok(result);
    }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateMovie(int id, [FromBody] UpdateFilmDto dto)
    {
        // Uzimamo role iz JWT claims
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? "User";

        var command = new UpdateFilmCommand
        {
            Id = id,
            Title = dto.Title,
            Description = dto.Description,
            RentPrice = dto.RentPrice,
            PurchasePrice = dto.PurchasePrice,
            Role = role
        };

        await sender.Send(command);
        return NoContent();
    }


}
