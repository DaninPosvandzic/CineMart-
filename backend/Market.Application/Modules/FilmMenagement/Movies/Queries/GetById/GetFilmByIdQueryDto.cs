public sealed class GetFilmByIdQueryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public decimal PurchasePrice { get; set; }
    public decimal RentPrice { get; set; }
    public string? PictureUrl { get; set; }
    public string? GenreName { get; set; }
    public double? AverageRating { get; set; }
    public int ViewCount { get; set; }

    // Lista komentara
    public List<CommentDto> Comments { get; set; } = new List<CommentDto>();

    public sealed class CommentDto
    {
        public string User { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string? Text { get; set; }
        public DateTime Date { get; set; }
    }
}
