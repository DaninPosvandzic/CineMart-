using MediatR;

namespace CineMart.Application.Modules.Identity.Users.Queries.GetById;

public class GetUserByIdQuery : IRequest<UserProfileDto>
{
    public int UserId { get; }

    public GetUserByIdQuery(int userId)
    {
        UserId = userId;
    }
}
