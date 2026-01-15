export interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: number;
  categoryName?: string;
  stockQuantity: number;
  averageRating: number;
  onSale: boolean;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: number;
}