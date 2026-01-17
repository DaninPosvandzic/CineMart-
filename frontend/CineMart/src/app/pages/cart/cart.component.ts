// src/app/features/cart/cart.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartItem, CartSummary } from '../../api-services/sales/cart-api.model';
import { CartService } from '../../api-services/sales/cart-api.service';

@Component({
  standalone: false,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit, OnDestroy {
  cartSummary: CartSummary = {
    items: [],
    totalItems: 0,
    totalPrice: 0
  };

  isLoading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Brže učitavanje - samo subscribe na postojeći state
    this.subscribeToCart();

    // Refresh samo ako je cart prazan
    if (this.cartService.getCurrentCart().length === 0) {
      this.loadCart();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCart(): void {
    this.isLoading = true;
    this.error = null;

    this.cartService.loadCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err: unknown) => {
          this.isLoading = false;
          this.error = 'Failed to load cart. Please try again.';
          console.error('Cart load error:', err);
        }
      });
  }

  private subscribeToCart(): void {
    this.cartService.cartSummary$
      .pipe(takeUntil(this.destroy$))
      .subscribe((summary: CartSummary) => {
        this.cartSummary = summary;
      });
  }

  updateQuantity(item: CartItem, change: number): void {
    // Samo produkti mogu mijenjati količinu
    if (item.isFilm) return;

    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      this.removeItem(item);
      return;
    }

    this.cartService.updateQuantity(item.id, newQuantity)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err: unknown) => {
          console.error('Update quantity error:', err);
          this.error = 'Failed to update quantity';
        }
      });
  }

  removeItem(item: CartItem): void {
    if (!confirm(`Remove "${item.name}" from cart?`)) return;

    this.cartService.removeFromCart(item.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err: unknown) => {
          console.error('Remove item error:', err);
          this.error = 'Failed to remove item';
        }
      });
  }

  clearCart(): void {
    if (!confirm('Are you sure you want to clear your cart?')) return;

    this.cartService.clearCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err: unknown) => {
          console.error('Clear cart error:', err);
          this.error = 'Failed to clear cart';
        }
      });
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/movies']);
  }

  getItemTypeLabel(item: CartItem): string {
    if (item.isFilm) {
      return item.isRent ? 'RENT' : 'BUY';
    }
    return 'PRODUCT';
  }

  getItemTypeBadgeClass(item: CartItem): string {
    if (item.isFilm && item.isRent) return 'rent';
    if (item.isFilm && !item.isRent) return 'buy';
    return 'product';
  }

  // Provjeri da li item može mijenjati količinu (samo produkti)
  canChangeQuantity(item: CartItem): boolean {
    return !item.isFilm;
  }

  // Get image URL - Film ima PictureUrl, Product ima ImageUrl
  getItemImage(item: CartItem): string {
    // Za filmove koristi PictureUrl
    if (item.isFilm) {
      const pictureUrl = (item as any).pictureUrl || (item as any).PictureUrl;
      if (pictureUrl) {
        return this.buildImageUrl(pictureUrl);
      }
    }
    // Za produkte koristi ImageUrl
    else {
      const imageUrl = (item as any).imageUrl || (item as any).ImageUrl;
      if (imageUrl) {
        return this.buildImageUrl(imageUrl);
      }
    }

    // SVG placeholder ako nema slike
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect width="200" height="300" fill="%23222"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23666"%3ENo Image%3C/text%3E%3C/svg%3E';
  }

  private buildImageUrl(url: string): string {
    if (!url) return '';

    // Ako je već puni URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // Ako je relativni path koji počinje sa /
    if (url.startsWith('/')) {
      return url;
    }

    // Inače, construiraj URL - prilagodi prema svom backendu
    return url; // Backend već vraća pravilan path
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }
}
