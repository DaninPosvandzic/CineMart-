using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Application.Modules.FilmMenagement.Movies.Command.Update
{
    public class UpdateFilmCommand : IRequest<Unit>
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal RentPrice { get; set; }
        public decimal PurchasePrice { get; set; }
        public string Role { get; set; } = "User";
    }

}
