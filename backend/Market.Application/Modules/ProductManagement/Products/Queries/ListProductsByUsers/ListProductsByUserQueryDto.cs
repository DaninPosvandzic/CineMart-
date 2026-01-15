namespace CineMart.Application.Modules.ProductManagement.Products.Queries.ListByUser;

public class ListProductsByUserQueryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}
