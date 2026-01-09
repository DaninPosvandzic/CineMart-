using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.FilmMenagement.Movies.Command.RateMovie
{
    public record RateMovieCommand(int MovieId, int UserId, int Value) : IRequest<Unit>;

}
