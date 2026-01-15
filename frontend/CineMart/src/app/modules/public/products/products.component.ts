import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../../api-services/Catalog/product-api.service';

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
  selectedFilter = 'price'; // sortBy
  sortAscending = true;

  constructor(private productService: ProductApiService) {}

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
}