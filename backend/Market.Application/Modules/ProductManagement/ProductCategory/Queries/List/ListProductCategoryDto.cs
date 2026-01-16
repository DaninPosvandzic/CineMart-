
namespace CineMart.Application.Modules.ProductManagement.ProductCategories.Queries.List
{
    public sealed class ListProductCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsEnabled { get; set; }
    }
}