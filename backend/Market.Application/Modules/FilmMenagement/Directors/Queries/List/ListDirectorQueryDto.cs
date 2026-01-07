namespace CineMart.Application.Modules.FilmMenagement.Directors.Queries.List
{
    public class ListDirectorQueryDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName => $"{FirstName} {LastName}";
        public DateTime DateOfBirth { get; set; }
        public string? CountryOfOrigin { get; set; }
        public int FilmCount { get; set; }
        public int Age => DateTime.UtcNow.Year - DateOfBirth.Year -
                         (DateTime.UtcNow.DayOfYear < DateOfBirth.DayOfYear ? 1 : 0);
    }
}