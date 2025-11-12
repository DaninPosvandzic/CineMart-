using CineMart.Domain.Common;
using CineMart.Domain.Entities.FilmManagement;
using CineMart.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Domain.Entities.UserInteraction
{
    public class RatingEntity:BaseEntity
    {
        
        public int UserId { get; set; }              
        public UserEntity? User { get; set; }        
        
        public int FilmId { get; set; }              
        public FilmEntity? Film { get; set; }       

        [Range(1, 10)]
        public int RatingValue { get; set; }         

        [MaxLength(Constraints.CommentMaxLength)]
        public string? Comment { get; set; }         
        public DateTime DateAdded { get; set; }      

        public bool IsEdited { get; set; }           

        public static class Constraints
        {
            public const int CommentMaxLength = 1000;
        }
    }
}
