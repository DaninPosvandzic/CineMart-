using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.FilmMenagement.Movies.Queries.GetMovieRating
{

    public class MovieRatingDto
    {
        public double Average { get; set; }
        public int Votes { get; set; }
        public int? UserRating { get; set; }
    }
}
