using CineMart.Application.Abstractions;
using CineMart.Application.Modules.Sales.CartItem.Command.Clear;
using CineMart.Application.Modules.Sales.CartItem.Command.Delete;
using CineMart.Application.Modules.Sales.CartItem.Command.Update;
using CineMart.Application.Modules.Sales.CartItem.Commands.Create;
using CineMart.Application.Modules.Sales.CartItem.Queries.GetByUserId;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize] // sve operacije zahtijevaju autentifikaciju
public class CartController(ISender sender, IAppCurrentUser currentUser) : ControllerBase
{
    // ===== GET: /api/cart =====
    [HttpGet]
    public async Task<ActionResult<List<ListCartItemsByUserIdQueryDto>>> GetCart(CancellationToken ct)
    {
        var userId = currentUser.UserId ?? int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = await sender.Send(new ListCartItemsByUserIdQuery { UserId = userId }, ct);
        return Ok(items);
    }

    // ===== POST: /api/cart =====
    [HttpPost]
    public async Task<ActionResult<int>> AddToCart([FromBody] CreateCartItemCommand command, CancellationToken ct)
    {
        command.UserId = currentUser.UserId ?? int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var cartItemId = await sender.Send(command, ct);
        return Ok(cartItemId);
    }

    // ===== DELETE: /api/cart/clear =====
    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart(CancellationToken ct)
    {
        var userId = currentUser.UserId ?? int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Poziva novi Command
        await sender.Send(new ClearCartItemCommand(userId), ct);

        return NoContent(); // 204
    }

    // ===== DELETE: /api/cart/{id} =====
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> RemoveFromCart(int id, CancellationToken ct)
    {
        var userId = currentUser.UserId ?? int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Poziva komandu za brisanje jedne stavke
        await sender.Send(new DeleteCartItemCommand(id, userId), ct);

        return NoContent(); // 204
    }

    // ===== PUT: /api/cart/{id} =====
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCartItem(int id, [FromBody] UpdateCartItemCommandDto dto, CancellationToken ct)
    {
        var userId = currentUser.UserId ?? int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var command = new UpdateCartItemCommand(
            cartItemId: id,
            userId: userId,
            quantity: dto.Quantity,
            totalPrice: dto.TotalPrice
        );

        await sender.Send(command, ct);

        return NoContent(); // 204
    }
}
