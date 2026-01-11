import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../core/services/cart/cart.service';


@Component({
  standalone:false,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.movieId, item.type);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
