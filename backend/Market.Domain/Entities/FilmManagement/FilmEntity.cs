using CineMart.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Domain.Entities.FilmManagement;

    public class FilmEntity:BaseEntity
    {
        [MaxLength(Constraints.NameMaxLength)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(Constraints.NameMaxLength)]
        public string? Description { get; set; }          

        public int ReleaseYear { get; set; }              

        public string? TrailerUrl { get; set; }           

        public decimal PurchasePrice { get; set; }       

        public decimal RentPrice { get; set; }           

        public int GenreId { get; set; }                  

        public int DirectorId { get; set; }              

        public double? AverageRating { get; set; }        

        public int ViewCount { get; set; }                

        public DateTime DateAdded { get; set; }

        public static class Constraints
        {
            public const int NameMaxLength = 150;
            public const int DescriptionMaxLength = 1000;
        }
    }

