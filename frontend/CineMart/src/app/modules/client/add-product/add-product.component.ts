import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { DialogHelperService } from '../../../modules/shared/services/dialog-helper.service';
import { ProductApiService } from '../../../api-services/Catalog/product-api.service';
import { ProductCategoryApiService } from '../../../api-services/Catalog/product-category-api.service';
import { ProductCategory } from '../../../api-services/Catalog/product-category.model';
import { CreateProductDto } from '../../../api-services/Catalog/product-api.model';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categories: ProductCategory[] = [];
  isSubmitting = false;

  product: CreateProductDto = {
    name: '',
    description: undefined,
    price: 0,
    imageUrl: undefined,
    categoryId: undefined
  };

  errorKey: string | undefined;

  constructor(
    private productService: ProductApiService,
    private categoryService: ProductCategoryApiService,
    private authService: AuthFacadeService,
    private dialogHelper: DialogHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
  this.categoryService.getAll().subscribe({
    next: (res) => {
      console.log('Loaded categories:', res); // Debug: provjeri da li dolaze
      this.categories = res.filter((c) => c.isEnabled);
    },
    error: (err) => {
      console.error('Category load error:', err);
    }
  });
}

  submitProduct(): void {
    if (!this.authService.isAuthenticated()) {
      this.dialogHelper.showWarning(
        'DIALOGS.TITLES.WARNING',
        'PRODUCTS.DIALOGS.NOT_AUTHENTICATED'
      );
      return;
    }

    if (!this.isFormValid()) {
      this.dialogHelper.showWarning(
        'DIALOGS.TITLES.WARNING',
        'PRODUCTS.DIALOGS.INCOMPLETE_FORM'
      );
      return;
    }

    this.isSubmitting = true;

  this.productService.create(this.product).subscribe({
  next: (id: number) => {
    this.isSubmitting = false;

    this.dialogHelper
      .showSuccess(
        'DIALOGS.TITLES.SUCCESS',
        'PRODUCTS.DIALOGS.SUCCESS_CREATE',
        { name: this.product.name }
      )
      .subscribe(() => this.router.navigate(['/']));
  },
  error: () => {
    this.isSubmitting = false;
    this.dialogHelper.showError(
      'DIALOGS.TITLES.ERROR',
      'PRODUCTS.DIALOGS.ERROR_CREATE'
    );
  }
});
  }

  private isFormValid(): boolean {
    return !!(
      this.product.name?.trim() &&
      this.product.price != null &&
      this.product.price >= 0 &&
      this.product.categoryId
    );
  }
}
