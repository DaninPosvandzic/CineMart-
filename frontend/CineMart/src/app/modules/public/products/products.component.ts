import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../../api-services/Catalog/product-api.service';
import {CartService} from '../../../api-services/sales/cart-api.service';
import {AddToCartRequest} from '../../../api-services/sales/cart-api.model';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  pageNumber = 1;
  pageSize = 8;
  totalCount = 0;
  totalPages = 1;

  searchTerm = '';
  selectedFilter = 'price';
  sortAscending = true;

  // Praćenje proizvoda koji se dodaju u korpu
  addingToCart = new Set<number>();

  constructor(
    private productService: ProductApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.searchTerm,
        this.selectedFilter,
        this.sortAscending ? 'asc' : 'desc'
      )
      .subscribe((res: any) => {
        this.products = res.items;
        this.totalCount = res.total;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      });
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadProducts();
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
    this.loadProducts();
  }

  addToCart(product: any, event: Event): void {
    event.stopPropagation();

    // Sprečava multiple klikove
    if (this.addingToCart.has(product.id)) {
      return;
    }

    this.addingToCart.add(product.id);

    const request: AddToCartRequest = {
      productId: product.id,
      isRent: false, // Proizvodi se kupuju, ne iznajmljuju
      quantity: 1,
      note: undefined
    };

    this.cartService.addToCart(request).subscribe({
      next: (cartItemId:any) => {
        this.addingToCart.delete(product.id);
      },
      error: (error:unknown) => {
        console.error('Error adding to cart:', error);
        this.showError('Greška pri dodavanju u korpu. Pokušajte ponovo.');
        this.addingToCart.delete(product.id);
      }
    });
  }

  isAddingToCart(productId: number): boolean {
    return this.addingToCart.has(productId);
  }

  private showSuccess(message: string): void {
    // Implementirajte vašu notification logiku
    // Možete koristiti toast service, snackbar, ili alert
    alert(message); // Privremeno rješenje
  }

  private showError(message: string): void {
    // Implementirajte vašu error notification logiku
    alert(message); // Privremeno rješenje
  }
}
