using MediatR;

public class ListFilmsByUserQuery : IRequest<List<ListFilmsByUserQueryDto>>
{
    public int UserId { get; set; }
}
