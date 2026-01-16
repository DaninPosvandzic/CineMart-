using MediatR;

namespace CineMart.Application.Modules.ProductManagement.ProductCategories.Queries.List
{
    public sealed record ListProductCategoryQuery
        : IRequest<List<ListProductCategoryDto>>
    {
    }
}