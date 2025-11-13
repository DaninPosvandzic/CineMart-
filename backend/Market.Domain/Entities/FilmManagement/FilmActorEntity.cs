using CineMart.Domain.Common;

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
