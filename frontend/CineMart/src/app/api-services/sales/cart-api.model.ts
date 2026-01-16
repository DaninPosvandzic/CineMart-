// src/app/api-services/sales/cart-api.model.ts

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  isFilm: boolean;
  isRent: boolean;
  note?: string;

  filmId?: number;
  productId?: number;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface AddToCartRequest {
  filmId?: number;
  productId?: number;
  quantity: number;
  isRent?: boolean;
  note?: string;
}

export interface AddToCartRequestBackend extends AddToCartRequest {
  userId: number;
}
