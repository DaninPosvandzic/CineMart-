using MediatR;

namespace CineMart.Application.Modules.ProductManagement.Products.Command.Update;

public class UpdateProductCommand : IRequest<Unit>
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal? Price { get; set; }
    public int? CategoryId { get; set; }
    public int StockQuantity { get; set; }
    public string Role { get; set; } = "User"; // Admin check
}

