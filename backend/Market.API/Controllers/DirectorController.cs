using CineMart.Application.Modules.FilmMenagement.Directors.Queries.List;

namespace CineMart.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorController(ISender sender) : ControllerBase
    {
        // GET /api/Director/GetAll
        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<ListDirectorQueryDto>> GetAll(
            [FromQuery] ListDirectorQuery query,
            CancellationToken ct)
        {
            return await sender.Send(query, ct);
        }
    }
}