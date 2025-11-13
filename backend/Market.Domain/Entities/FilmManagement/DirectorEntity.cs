using CineMart.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Domain.Entities.FilmManagement
{
    public class DirectorEntity : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;    
        public string LastName { get; set; } = string.Empty;      
        public DateTime DateOfBirth { get; set; }                 
        public string? CountryOfOrigin { get; set; }              
        public int FilmCount { get; set; }                        

        public static class Constraints
        {
            public const int NameMaxLength = 100;
            public const int CountryMaxLength = 100;
        }
    }
}
