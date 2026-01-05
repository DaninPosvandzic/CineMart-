
using CineMart.Application.Modules.Auth.Commands.Film.Update;
using CineMart.Application.Modules.Auth.Commands.Movie.DeleteMovie;

namespace CineMart.API.Controllers;

[ApiController]
[Route("api/film")]
[Authorize] // samo autorizovani korisnici
public sealed class MovieController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<FilmDto>> Create(
    [FromBody] CreateFilmDto dto,
    CancellationToken ct)
    {
        return Ok(await mediator.Send(dto, ct));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<FilmDto>> Update(
    int id,
    [FromBody] UpdateFilmDto dto,
    CancellationToken ct)
    {
        var command = new UpdateFilmCommand(
            id,
            dto.Title,
            dto.ReleaseYear,
            dto.PurchasePrice,
            dto.RentPrice
        );

        return Ok(await mediator.Send(command, ct));
    }


    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await mediator.Send(new DeleteFilmCommand(id), ct);
        return NoContent();
    }
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<FilmDto>>> GetAll(
    CancellationToken ct)
    {
        var films = await mediator.Send(new GetFilmsQuery(), ct);
        return Ok(films);
    }
}
