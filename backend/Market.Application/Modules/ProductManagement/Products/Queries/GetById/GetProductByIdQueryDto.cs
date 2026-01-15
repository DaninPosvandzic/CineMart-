namespace CineMart.Application.Modules.ProductManagement.Products.Queries.GetById;

public sealed class GetProductByIdQueryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal? Price { get; set; }
    public string? ImageUrl { get; set; }
    public string? CategoryName { get; set; }
    public int StockQuantity { get; set; }
    public decimal AverageRating { get; set; }
}
