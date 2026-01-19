using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.FilmMenagement.Movies.Command.Update
{
    public class UpdateFilmDto
    {
        public string Title { get; set; } = string.Empty;
        public int ReleaseYear { get; set; }
        public string? Description { get; set; }
        public decimal RentPrice { get; set; }
        public decimal PurchasePrice { get; set; }
    }
}
