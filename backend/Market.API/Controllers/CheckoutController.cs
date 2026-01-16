
using Stripe.Checkout;
using CineMart.Application.Modules.Sales.Checkout;

namespace CineMart.Api.Controllers;

[ApiController]
[Route("api/checkout")]
[Authorize]
public class CheckoutController : ControllerBase
{
    // ======================================================
    // CREATE STRIPE CHECKOUT SESSION
    // ======================================================
    [HttpPost("create-session")]
    public async Task<ActionResult<CheckoutSessionResponseDto>>
        CreateSession([FromBody] CheckoutSessionRequestDto request)
    {
        var lineItems = request.CartItems.Select(item =>
            new SessionLineItemOptions
            {
                Quantity = item.Quantity,
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = "eur",
                    UnitAmount = (long)(item.Price * 100),
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = item.Name,
                        Metadata = new Dictionary<string, string>
                        {
                            { "isFilm", item.IsFilm.ToString() },
                            { "isRent", item.IsRent.ToString() },
                            { "filmId", item.FilmId?.ToString() ?? "" },
                            { "productId", item.ProductId?.ToString() ?? "" }
                        }
                    }
                }
            }).ToList();

        var options = new SessionCreateOptions
        {
            Mode = "payment",
            SuccessUrl = request.SuccessUrl,
            CancelUrl = request.CancelUrl,
            LineItems = lineItems,
            PaymentMethodTypes = new List<string> { "card" }
        };

        var service = new SessionService();
        var session = await service.CreateAsync(options);

        return Ok(new CheckoutSessionResponseDto
        {
            SessionId = session.Id,
            CheckoutUrl = session.Url
        });
    }

    // ======================================================
    // VERIFY PAYMENT
    // ======================================================
    [HttpGet("verify-payment/{sessionId}")]
    public async Task<ActionResult> VerifyPayment(string sessionId)
    {
        var service = new SessionService();
        var session = await service.GetAsync(sessionId);

        if (session.PaymentStatus == "paid")
        {
            // 👉 OVDJE KREIRAŠ ORDER U BAZI
            // var orderId = ...

            return Ok(new
            {
                success = true,
                orderId = 123,
                message = "Payment successful"
            });
        }

        return BadRequest(new
        {
            success = false,
            message = "Payment not completed"
        });
    }

    // ======================================================
    // CANCEL (opciono)
    // ======================================================
    [HttpPost("cancel")]
    public IActionResult Cancel([FromBody] dynamic body)
    {
        return Ok();
    }
}
