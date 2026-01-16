using CineMart.Application.Modules.ProductManagement.Products.Command.Create;
using CineMart.Application.Modules.ProductManagement.Products.Command.Delete;
using CineMart.Application.Modules.ProductManagement.Products.Command.Update;
using CineMart.Application.Modules.ProductManagement.Products.Queries.GetById;
using CineMart.Application.Modules.ProductManagement.Products.Queries.List;
using MediatR;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("[controller]")]
public class ProductController(ISender sender) : ControllerBase
{
    // GET /products
    [AllowAnonymous]
    [HttpGet("GetAll")]
    public async Task<PageResult<ListProductQueryDto>> List(
        [FromQuery] ListProductQuery query,
        CancellationToken ct)
    {
        return await sender.Send(query, ct);
    }

    // GET /products/{id}
    [AllowAnonymous]
    [HttpGet("{id:int}")]
    public async Task<GetProductByIdQueryDto> GetProduct(int id, CancellationToken ct)
    {
        return await sender.Send(new GetProductByIdQuery { Id = id }, ct);
    }

    // POST /products
    [Authorize(Roles = "Admin")]
    [HttpPost("Create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateProductCommand command, CancellationToken ct)
    {
        var productId = await sender.Send(command, ct);
        return Ok(productId);
    }

    // PUT /products/{id}
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductCommand command)
    {
        if (id != command.Id)
            return BadRequest("Product ID mismatch");

        await sender.Send(command);
        return NoContent();
    }

    // DELETE /products/{id}
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        await sender.Send(new DeleteProductCommand { Id = id });
        return NoContent();
    }
}

