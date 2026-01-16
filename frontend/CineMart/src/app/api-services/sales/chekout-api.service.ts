// src/app/api-services/sales/checkout-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthFacadeService } from '../../core/services/auth/auth-facade.service';
import {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  OrderConfirmation,
  PaymentVerification
} from './chekout-api.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutApiService {
  private baseUrl = `${environment.apiUrl}/checkout`;

  constructor(
    private http: HttpClient,
    private auth: AuthFacadeService
  ) {}

  /** 🔐 Helper: JWT headers */
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getAccessToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * ✅ CREATE STRIPE CHECKOUT SESSION
   * Backend će kreirati Stripe session i vratiti URL za redirect
   */
  createCheckoutSession(request: CheckoutSessionRequest): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(
      `${this.baseUrl}/create-session`,
      request,
      this.getAuthHeaders()
    );
  }

  /**
   * ✅ VERIFY PAYMENT (poziva se nakon redirecta sa Stripe-a)
   * Provjerava da li je payment uspješan i kreira order
   */
  verifyPayment(sessionId: string): Observable<PaymentVerification> {
    return this.http.get<PaymentVerification>(
      `${this.baseUrl}/verify-payment/${sessionId}`,
      this.getAuthHeaders()
    );
  }

  /**
   * ✅ GET ORDER DETAILS
   * Vraća detalje order-a nakon uspješnog plaćanja
   */
  getOrderConfirmation(orderId: number): Observable<OrderConfirmation> {
    return this.http.get<OrderConfirmation>(
      `${this.baseUrl}/order/${orderId}`,
      this.getAuthHeaders()
    );
  }

  /**
   * ✅ CANCEL CHECKOUT
   * Opciono - možeš zvati ovo ako user odustane
   */
  cancelCheckout(sessionId: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/cancel`,
      { sessionId },
      this.getAuthHeaders()
    );
  }
}
