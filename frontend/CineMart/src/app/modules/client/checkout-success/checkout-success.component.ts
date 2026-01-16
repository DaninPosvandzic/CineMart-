// src/app/features/checkout/checkout-success/checkout-success.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutApiService } from '../../../api-services/sales/chekout-api.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
  standalone: false
})
export class CheckoutSuccessComponent implements OnInit {
  sessionId: string | null = null;
  statusMessage: string = 'Verifying payment...';
  isLoading = true;
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1️⃣ Uhvati session_id iz query param
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (!this.sessionId) {
      this.statusMessage = 'No session ID provided.';
      this.isLoading = false;
      return;
    }

    // 2️⃣ Pozovi backend da provjeri plaćanje
    this.checkoutService.verifyPayment(this.sessionId).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.success) {
          this.statusMessage = 'Payment successful! Thank you for your order.';
          this.isSuccess = true;
        } else {
          this.statusMessage = `Payment failed: ${result.message}`;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Verify payment error:', err);
        this.statusMessage = 'An error occurred while verifying your payment.';
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
