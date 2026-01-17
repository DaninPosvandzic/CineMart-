namespace CineMart.Application.Modules.Sales.CartItem.Command.Update
{
    public class UpdateCartItemCommandDto
    {
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
