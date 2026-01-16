namespace CineMart.Application.Modules.Sales.Checkout;
public class CheckoutSessionRequestDto
{
    public string SuccessUrl { get; set; } = null!;
    public string CancelUrl { get; set; } = null!;
    public List<CheckoutCartItemDto> CartItems { get; set; } = new();
}

