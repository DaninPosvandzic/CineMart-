using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CineMart.Application.Modules.Identity.Users.Queries.GetById;

public sealed class GetUserByIdQueryHandler(IAppDbContext ctx)
    : IRequestHandler<GetUserByIdQuery, UserProfileDto>
{
    public async Task<UserProfileDto> Handle(
        GetUserByIdQuery request,
        CancellationToken ct)
    {
        var userDto = await ctx.Users
            .AsNoTracking()
            .Include(u => u.Roll)
            .Where(u => u.Id == request.UserId && !u.IsDeleted)
            .Select(u => new UserProfileDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,

                ProfileImageUrl = u.ProfileImageUrl,
                Status = u.Status,
                IsEnabled = u.IsEnabled,

                Role = u.Roll != null ? u.Roll.Name : null,

                CreatedAtUtc = u.CreatedAtUtc,
                LastLogin = u.LastLogin
            })
            .FirstOrDefaultAsync(ct);

        if (userDto == null)
        {
            throw new KeyNotFoundException(
                $"User with Id {request.UserId} not found.");
        }

        return userDto;
    }
}
