using CineMart.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMart.Domain.Entities.FilmManagement
{
    public class FilmActorEntity:BaseEntity
    {
        public int FilmId { get; set; }          
        public FilmEntity? Film { get; set; }

        public int ActorId { get; set; }         
        public ActorEntity? Actor { get; set; }
    }
}
