using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CineMart.Application.Modules.ProductManagement.ProductCategories.Queries.List;


[ApiController]
[Route("[controller]")]
public class ProductCategoryController : ControllerBase
{
    private readonly ISender _sender;

    public ProductCategoryController(ISender sender)
    {
        _sender = sender;
    }

    // GET /ProductCategory
    [AllowAnonymous] // ⬅️ BITNO
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var result = await _sender.Send(new ListProductCategoryQuery(), ct);
        return Ok(result);
    }
}
