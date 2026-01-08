namespace CineMart.Application.Modules.Identity.Users.Queries.GetById;

public class UserProfileDto
{
    public int Id { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    public string? ProfileImageUrl { get; set; }

    public string Status { get; set; }
    public bool IsEnabled { get; set; }

    public string Role { get; set; }

    public DateTime CreatedAtUtc { get; set; }
    public DateTime? LastLogin { get; set; }
}
