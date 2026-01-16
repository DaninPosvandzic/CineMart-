// src/app/api-services/sales/checkout-api.model.ts

export interface CheckoutSessionRequest {
  successUrl: string;
  cancelUrl: string;
  cartItems: CheckoutCartItem[];
}

export interface CheckoutCartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isFilm: boolean;
  isRent: boolean;
  filmId?: number;
  productId?: number;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
}

export interface OrderConfirmation {
  orderId: number;
  sessionId: string;
  status: 'pending' | 'completed' | 'failed';
  totalAmount: number;
  createdAt: Date;
}

export interface PaymentVerification {
  success: boolean;
  orderId?: number;
  message: string;
}
