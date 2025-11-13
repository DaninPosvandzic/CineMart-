using CineMart.Domain.Common;

namespace CineMart.Domain.Entities.FilmManagement
{
    public class GenreEntity:BaseEntity
    {
        public string Name { get; set; } = string.Empty;     
        public string? Description { get; set; }             

        public int Popularity { get; set; }                  
       
        public static class Constraints
        {
            public const int NameMaxLength = 100;
            public const int DescriptionMaxLength = 500;
        }
    }
}
