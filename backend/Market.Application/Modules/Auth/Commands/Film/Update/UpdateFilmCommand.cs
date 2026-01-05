using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.Auth.Commands.Film.Update
{
    public sealed record UpdateFilmCommand(int Id,string Title,int ReleaseYear,decimal PurchasePrice,decimal RentPrice) : IRequest<FilmDto>;

}
