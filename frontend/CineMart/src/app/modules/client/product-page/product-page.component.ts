import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../api-services/Catalog/product-api.model';
import { ProductApiService } from '../../../api-services/Catalog/product-api.service';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { CartService } from '../../../api-services/sales/cart-api.service';

@Component({
  selector: 'app-product-page',
  standalone: false,
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product | null = null;
  isLoading = true;
  errorMessage = '';

  // ===== Quantity Management =====
  quantity = 1;

  // ===== Tabs =====
  activeTab = 'details';

  // ===== Admin Modals =====
  showDeleteModal = false;
  showEditModal = false;
  editProduct: any = null;

  // ===== Loading states =====
  loadingCart = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productApi: ProductApiService,
    private auth: AuthFacadeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (!productId) {
      this.errorMessage = 'Proizvod nije pronađen';
      this.isLoading = false;
      return;
    }

    this.loadProduct(productId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== Product Loading =====
  loadProduct(productId: number): void {
    this.productApi.getById(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product: Product) => {
          this.product = product;
          this.isLoading = false;
          console.log('Product loaded:', this.product);
        },
        error: (err: unknown) => {
          console.error('Product load error:', err);
          this.errorMessage = 'Proizvod nije pronađen';
          this.isLoading = false;
        }
      });
  }

  // ===== Quantity Management =====
  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stockQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  validateQuantity(): void {
    if (!this.product) return;

    if (this.quantity < 1) {
      this.quantity = 1;
    } else if (this.quantity > this.product.stockQuantity) {
      this.quantity = this.product.stockQuantity;
    }
  }

  getTotalPrice(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }

  // ===== Cart Actions =====
  addToCart(): void {
    if (!this.product || this.loadingCart || this.product.stockQuantity === 0) return;

    this.loadingCart = true;

    // Assuming your CartService has an addToCart method similar to the film one
    // You may need to adjust this based on your actual CartService implementation
    const request = {
      productId: this.product.id,
      quantity: this.quantity
    };

    this.cartService.addToCart(request as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadingCart = false;
          this.showSuccessMessage(`"${this.product!.name}" (${this.quantity}x) dodano u košaricu`);
          // Reset quantity after successful add
          this.quantity = 1;
        },
        error: (err: unknown) => {
          this.loadingCart = false;
          console.error('Add to cart error:', err);
          this.showErrorMessage('Greška pri dodavanju u košaricu');
        }
      });
  }

  // ===== Tabs =====
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // ===== Admin Functions =====
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  openEditModal(): void {
    if (!this.product) return;
    this.editProduct = { ...this.product };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editProduct = null;
  }

  submitEdit(): void {
    if (!this.editProduct) return;

    this.productApi.update(this.editProduct.id, this.editProduct).subscribe({
      next: () => {
        this.product = { ...this.editProduct };
        this.showEditModal = false;
        this.showSuccessMessage('Proizvod uspješno ažuriran');
      },
      error: (err: unknown) => {
        console.error('UPDATE FAILED', err);
        this.showErrorMessage('Greška pri ažuriranju proizvoda');
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.product) return;

    this.productApi.delete(this.product.id).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.showSuccessMessage('Proizvod uspješno obrisan');
        this.router.navigate(['/products']);
      },
      error: (err: unknown) => {
        this.showDeleteModal = false;
        console.error('Delete failed', err);
        this.showErrorMessage('Greška pri brisanju proizvoda');
      }
    });
  }

  // ===== Notification Methods =====
  private showSuccessMessage(message: string): void {
    console.log('✓', message);
    // TODO: Replace with your notification service
    // Example: this.toastService.success(message);
  }

  private showErrorMessage(message: string): void {
    console.error('✗', message);
    alert(message); // Temporary solution
    // TODO: Replace with your notification service
    // Example: this.toastService.error(message);
  }
}
