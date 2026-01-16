// src/app/core/services/cart.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, filter } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CurrentUserService } from '../../core/services/auth/current-user.service';
import { AddToCartRequest, AddToCartRequestBackend, CartItem, CartSummary } from './cart-api.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private currentUserService = inject(CurrentUserService);

  private apiUrl = `${environment.apiUrl}/cart`;

  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Public observables
  cart$ = this.cartSubject.asObservable();

  cartCount$ = this.cart$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  cartSummary$: Observable<CartSummary> = this.cart$.pipe(
    map(items => ({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.totalPrice, 0)
    }))
  );

  constructor() {
    // Cart sync is now handled by AuthFacadeService using signal effects
    // This ensures cart updates automatically when auth state changes
  }

  // ===== API CALLS =====

  /**
   * Fetch cart from backend
   */
  loadCart(): Observable<CartItem[]> {
    if (!this.currentUserService.isAuthenticated()) {
      this.clearLocalCart();
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    return this.http.get<CartItem[]>(this.apiUrl).pipe(
      tap(items => this.cartSubject.next(items))
    );
  }

  /**
   * Add item to cart
   */
  addToCart(request: AddToCartRequest): Observable<number> {
    const userId = this.currentUserService.snapshot?.userId;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const fullRequest: AddToCartRequestBackend = {
      ...request,
      userId
    };

    return this.http.post<number>(this.apiUrl, fullRequest).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }

  /**
   * Remove item from cart
   */
  removeFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartItemId}`).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }

  /**
   * Update cart item quantity
   */
  updateQuantity(cartItemId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cartItemId}`, { quantity }).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }

  /**
   * Clear entire cart
   */
  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`).pipe(
      tap(() => this.cartSubject.next([]))
    );
  }

  /**
   * Force refresh cart (useful after login/profile switch)
   */
  refreshCart(): Observable<CartItem[]> {
    return this.loadCart();
  }

  /**
   * Clear local cart state (used on logout)
   */
  private clearLocalCart(): void {
    this.cartSubject.next([]);
  }

  /**
   * Check if item exists in cart
   */
  hasItem(filmId: number, isRent: boolean): Observable<boolean> {
    return this.cart$.pipe(
      map(items => items.some(
        item => item.id === filmId && item.isRent === isRent
      ))
    );
  }

  /**
   * Get current cart value (synchronous)
   */
  getCurrentCart(): CartItem[] {
    return this.cartSubject.value;
  }

  /**
   * Get total price (synchronous)
   */
  getTotalPrice(): number {
    return this.cartSubject.value.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
  }

}
