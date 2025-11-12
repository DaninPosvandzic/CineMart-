using CineMart.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Domain.Entities.FilmManagement
{
    public class GenreEntity:BaseEntity
    {
        [MaxLength(Constraints.NameMaxLength)]
        public string Name { get; set; } = string.Empty;     

        [MaxLength(Constraints.DescriptionMaxLength)]
        public string? Description { get; set; }             

        public int Popularity { get; set; }                  

        public DateTime DateCreated { get; set; }           

        public static class Constraints
        {
            public const int NameMaxLength = 100;
            public const int DescriptionMaxLength = 500;
        }
    }
}
