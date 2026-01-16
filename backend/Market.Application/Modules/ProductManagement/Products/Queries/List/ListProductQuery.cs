using System.Text.Json.Serialization;

namespace CineMart.Application.Modules.ProductManagement.Products.Queries.List;

public sealed class ListProductQuery : BasePagedQuery<ListProductQueryDto>
{
    public string? Search { get; init; }
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 8;

    [JsonIgnore]
    public int SkipCount => (Page - 1) * PageSize;

    public string? SortBy { get; set; } = "price"; // price | name
    public string? SortDir { get; set; } = "asc";  // asc | desc
}
