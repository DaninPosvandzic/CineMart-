using MediatR;

namespace CineMart.Application.Modules.ProductManagement.Products.Command.Create;

public class CreateProductCommand : IRequest<int>
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal? Price { get; set; }
    public string? ImageUrl { get; set; }
    public int? CategoryId { get; set; }
    public int StockQuantity { get; set; } = 0;
}
