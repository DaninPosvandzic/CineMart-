public sealed class FilmDto
{
    public int Id { get; init; }

    public string Title { get; init; } = default!;

    public int ReleaseYear { get; init; }

    public decimal PurchasePrice { get; init; }

    public decimal RentPrice { get; init; }
}