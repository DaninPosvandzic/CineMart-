namespace CineMart.Application.Modules.ProductManagement.Products.Queries.List;

public class ListProductQueryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal? Price { get; set; }
    public string? ImageUrl { get; set; }
    public string? CategoryName { get; set; }
    public decimal AverageRating { get; set; }
}
