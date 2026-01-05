using CineMart.Domain.Entities.FilmManagement;

namespace CineMart.Application.Modules.FilmManagement.Movies.Command.Create
{
    public class CreateFilmCommandHandler : IRequestHandler<CreateFilmCommand, int>
    {
        private readonly IAppDbContext _ctx;
        private readonly IAppCurrentUser _currentUser;

        public CreateFilmCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
        {
            _ctx = ctx;
            _currentUser = currentUser;
        }

        public async Task<int> Handle(CreateFilmCommand request, CancellationToken ct)
        {
            #region Create FilmEntity
            var film = new FilmEntity
            {
                Title = request.Title,
                Description = request.Description,
                ReleaseYear = request.ReleaseYear,
                TrailerUrl = request.TrailerUrl,
                PictureUrl = request.PictureUrl,
                PurchasePrice = request.PurchasePrice,
                RentPrice = request.RentPrice,
                GenreId = request.GenreId,
                AverageRating = 2.5,
                DirectorId = request.DirectorId,
                DateAdded = DateTime.UtcNow,
                UserId = _currentUser.UserId!.Value
            };

            _ctx.Films.Add(film);
            #endregion

            await _ctx.SaveChangesAsync(ct);

            return film.Id;
        }
    }
}
