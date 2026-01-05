public sealed class CreateFilmDto : IRequest<FilmDto>
{
    public string Title { get; init; } = default!;

    public int ReleaseYear { get; init; }

    public decimal PurchasePrice { get; init; }

    public decimal RentPrice { get; init; }
}