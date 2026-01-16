import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { CartService } from '../../../api-services/sales/cart-api.service';
import { AddToCartRequest } from '../../../api-services/sales/cart-api.model';

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  films: any[] = [];

  pageNumber: number = 1;
  pageSize: number = 8;
  totalCount: number = 0;
  totalPages: number = 1;

  searchTerm: string = '';
  selectedFilter = 'rating'; // sortBy
  sortAscending = true;

  // Loading states per film
  loadingStates: { [key: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  constructor(
    private filmService: FilmService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMovies() {
    this.filmService
      .getAllMovies(
        this.pageNumber,
        this.pageSize,
        this.searchTerm,
        this.selectedFilter,
        this.sortAscending ? 'asc' : 'desc'
      )
      .subscribe((res: any) => {
        this.films = res.items;
        this.totalCount = res.total;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      });
  }

  onSearch() {
    this.pageNumber = 1;
    this.loadMovies();
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadMovies();
  }

  toggleSort() {
    this.sortAscending = !this.sortAscending;
    this.loadMovies();
  }

  /**
   * Add film to cart (Buy)
   */
  addToCartBuy(film: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const loadingKey = `buy-${film.id}`;

    if (this.loadingStates[loadingKey]) return;

    this.loadingStates[loadingKey] = true;

    const request: AddToCartRequest = {
      filmId: film.id,
      isRent: false,
      quantity: 1
    };

    this.cartService.addToCart(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadingStates[loadingKey] = false;
          this.showSuccessMessage(`"${film.title}" added to cart (Buy)`);
        },
        error: (err: unknown) => {
          this.loadingStates[loadingKey] = false;
          console.error('Add to cart error:', err);
          this.showErrorMessage('Failed to add item to cart');
        }
      });
  }

  /**
   * Add film to cart (Rent)
   */
  addToCartRent(film: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const loadingKey = `rent-${film.id}`;

    if (this.loadingStates[loadingKey]) return;

    this.loadingStates[loadingKey] = true;

    const request: AddToCartRequest = {
      filmId: film.id,
      isRent: true,
      quantity: 1
    };

    this.cartService.addToCart(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadingStates[loadingKey] = false;
          this.showSuccessMessage(`"${film.title}" added to cart (Rent)`);
        },
        error: (err: unknown) => {
          this.loadingStates[loadingKey] = false;
          console.error('Add to cart error:', err);
          this.showErrorMessage('Failed to add item to cart');
        }
      });
  }

  /**
   * Check if button is loading
   */
  isButtonLoading(filmId: number, type: 'buy' | 'rent'): boolean {
    return this.loadingStates[`${type}-${filmId}`] || false;
  }

  /**
   * Show success message (you can replace with a toast/snackbar service)
   */
  private showSuccessMessage(message: string) {
    // Replace with your notification service
    console.log('✓', message);
    // Example: this.toastService.success(message);
  }

  /**
   * Show error message (you can replace with a toast/snackbar service)
   */
  private showErrorMessage(message: string) {
    // Replace with your notification service
    console.error('✗', message);
    alert(message); // Temporary solution
    // Example: this.toastService.error(message);
  }
}
