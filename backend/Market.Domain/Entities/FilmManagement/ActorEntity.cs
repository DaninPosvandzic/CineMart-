using CineMart.Domain.Common;
using System.ComponentModel.DataAnnotations;


namespace CineMart.Domain.Entities.FilmManagement
{
    public class ActorEntity : BaseEntity
    {
        
        [MaxLength(Constraints.NameMaxLength)]
        public string FirstName { get; set; } = string.Empty;     

        
        [MaxLength(Constraints.NameMaxLength)]
        public string LastName { get; set; } = string.Empty;      

        public DateTime DateOfBirth { get; set; }                

        [MaxLength(Constraints.NationalityMaxLength)]
        public string? Nationality { get; set; }                  

        public int FilmCount { get; set; }                       

        public static class Constraints
        {
            public const int NameMaxLength = 100;
            public const int NationalityMaxLength = 100;
        }
    }
}
