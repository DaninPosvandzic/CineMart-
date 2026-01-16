// src/app/features/checkout/checkout.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartSummary } from '../../../api-services/sales/cart-api.model';
import { CartService } from '../../../api-services/sales/cart-api.service';
import { CheckoutApiService } from '../../../api-services/sales/chekout-api.service';
import {environment} from '../../../../environments/environment';


declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartSummary: CartSummary = {
    items: [],
    totalItems: 0,
    totalPrice: 0
  };

  isProcessing = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  private stripe: any;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutApiService,
    private router: Router
  ) {
    // 1️⃣ Inicijalizacija Stripe sa publishable key-em
    this.stripe = Stripe(environment.stripePublicKey);
  }

  ngOnInit(): void {
    // Load cart summary
    this.cartService.cartSummary$
      .pipe(takeUntil(this.destroy$))
      .subscribe(summary => {
        this.cartSummary = summary;

        // Redirect ako je cart prazan
        if (summary.items.length === 0) {
          this.router.navigate(['/cart']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  proceedToPayment(): void {
    if (this.isProcessing || this.cartSummary.items.length === 0) return;

    this.isProcessing = true;
    this.error = null;

    // 2️⃣ Kreiraj URLs za redirect
    const successUrl = `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${window.location.origin}/checkout/cancel`;

    // 3️⃣ Mapiraj cart items u Checkout DTO
    const request = {
      successUrl,
      cancelUrl,
      cartItems: this.cartSummary.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        isFilm: item.isFilm,
        isRent: item.isRent,
        filmId: item.filmId,
        productId: item.productId
      }))
    };

    // 4️⃣ Pozovi backend /create-session endpoint
    this.checkoutService.createCheckoutSession(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (response) => {
          if (response.checkoutUrl && response.sessionId) {
            // 5️⃣ Redirect na Stripe Checkout koristeći sessionId
            const result = await this.stripe.redirectToCheckout({
              sessionId: response.sessionId
            });

            if (result.error) {
              this.error = result.error.message;
              this.isProcessing = false;
            }
          } else {
            this.error = 'Checkout URL or session ID not received from server.';
            this.isProcessing = false;
          }
        },
        error: (err) => {
          this.isProcessing = false;
          console.error('Checkout error:', err);
          this.error = err?.error?.message || 'Failed to initialize payment. Please try again.';
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }

  getItemImage(item: any): string {
    if (item.isFilm) return item.pictureUrl || '/assets/placeholder-film.jpg';
    return item.imageUrl || '/assets/placeholder-product.jpg';
  }

  getItemTypeLabel(item: any): string {
    if (item.isFilm) return item.isRent ? 'RENT' : 'BUY';
    return 'PRODUCT';
  }

  getItemTypeBadgeClass(item: any): string {
    if (item.isFilm && item.isRent) return 'rent';
    if (item.isFilm && !item.isRent) return 'buy';
    return 'product';
  }
}
