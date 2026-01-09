using CineMart.Application.Modules.Identity.Users.Queries.GetById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UserController(ISender sender) : ControllerBase
{
    // GET /user/{id}
    [Authorize] // kasnije možeš finije kontrolirati (admin / self)
    [HttpGet("{id:int}")]
    public async Task<UserProfileDto> GetById(
        int id,
        CancellationToken ct)
    {
        return await sender.Send(
            new GetUserByIdQuery(id),
            ct
        );
    }

    // GET /user/me (trenutno ulogovani user)
    [Authorize]
    [HttpGet("Me")]
    public async Task<UserProfileDto> Me(CancellationToken ct)
    {
        var userIdClaim = User.FindFirst("sub")
                          ?? User.FindFirst("id");

        if (userIdClaim == null)
        {
            throw new UnauthorizedAccessException("User id claim not found.");
        }

        var userId = int.Parse(userIdClaim.Value);

        return await sender.Send(
            new GetUserByIdQuery(userId),
            ct
        );
    }
}
