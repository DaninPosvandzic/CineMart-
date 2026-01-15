import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface CartItem {
  movieId: number;
  title: string;
  price: number;
  type: 'rent' | 'buy';
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // internal state
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // public streams
  cart$ = this.cartSubject.asObservable();

  cartCount$ = this.cart$.pipe(
    map(items => items.length)
  );

  // ===== READ =====
  getCart() {
    return this.cart$;
  }

  getTotalPrice(): number {
    return this.cartSubject.value.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }

  // ===== WRITE =====
  addToCart(item: CartItem) {
    const items = this.cartSubject.value;

    const exists = items.some(
      i => i.movieId === item.movieId && i.type === item.type
    );

    if (exists) return;

    this.cartSubject.next([...items, item]);
  }

  removeFromCart(movieId: number, type: 'rent' | 'buy') {
    this.cartSubject.next(
      this.cartSubject.value.filter(
        i => !(i.movieId === movieId && i.type === type)
      )
    );
  }

  clearCart() {
    this.cartSubject.next([]);
  }
}
