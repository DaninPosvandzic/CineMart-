namespace CineMart.Application.Modules.FilmManagement.Queries.List;
public sealed class ListFilmQuery : BasePagedQuery<ListFilmQueryDto>
{
    public string? Search { get; init; }
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;

    [JsonIgnore]
    public int SkipCount => (Page - 1) * PageSize;

    public string? SortBy { get; set; } = "rating"; // rating | price | year | title
    public string? SortDir { get; set; } = "asc";   // asc | desc
}

