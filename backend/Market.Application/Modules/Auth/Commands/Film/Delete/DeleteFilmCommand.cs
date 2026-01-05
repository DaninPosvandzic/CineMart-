using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.Auth.Commands.Movie.DeleteMovie
{
    public sealed record DeleteFilmCommand(int Id) : IRequest<Unit>;

}
