// product-api.model.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  categoryId?: number;
  stockQuantity: number;
  averageRating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  stockQuantity: number;
}

export interface UpdateProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId?: number;
  stockQuantity: number;
}

export interface ProductSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'stock';
  sortDir?: 'asc' | 'desc';
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface ProductListResponse {
  total: number;
  items: Product[];
  page: number;
  pageSize: number;
  totalPages: number;
}
