import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { CartService } from '../../../api-services/sales/cart-api.service';
import { AddToCartRequest } from '../../../api-services/sales/cart-api.model';

@Component({
  selector: 'app-movie-page',
  standalone: false,
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit, OnDestroy {

  film: any;

  // ===== Rating & Reviews =====
  stars = [1, 2, 3, 4, 5];
  userRating = 0;
  hasRated = false;
  comment = '';

  // ===== Tabs =====
  activeTab = 'details';

  // ===== Admin Modals =====
  showDeleteModal = false;
  showEditModal = false;
  editFilm: any = null;

  // ===== Loading states =====
  loadingBuy = false;
  loadingRent = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private auth: AuthFacadeService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.filmService.getFilmById(id).subscribe(res => {
      this.film = res;
      console.log('Film loaded:', this.film);
    });

    this.loadRating(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== Rating System =====
  loadRating(movieId: number): void {
    this.filmService.getRating(movieId).subscribe(res => {
      this.userRating = res.userRating || 0;
      this.hasRated = !!res.userRating;
    });
  }

  onStarClick(star: number): void {
    if (this.hasRated) return;
    this.userRating = star;
  }

  submitRating(): void {
    if (!this.film || this.hasRated || this.userRating === 0 || !this.comment.trim()) return;

    this.filmService
      .rateMovie(this.film.id, this.userRating, this.comment)
      .subscribe({
        next: (updatedFilm) => {
          this.film = updatedFilm;
          this.hasRated = true;
          this.userRating = 0;
          this.comment = '';
        },
        error: (err) => console.error('Rating failed', err)
      });
  }

  // ===== Cart Actions =====
  /**
   * Add film to cart (Buy)
   */
  addToCartBuy(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.film || this.loadingBuy) return;

    this.loadingBuy = true;

    const request: AddToCartRequest = {
      filmId: this.film.id,
      isRent: false,
      quantity: 1
    };

    this.cartService.addToCart(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadingBuy = false;
          this.showSuccessMessage(`"${this.film.title}" added to cart (Buy)`);
        },
        error: (err: unknown) => {
          this.loadingBuy = false;
          console.error('Add to cart error:', err);
          this.showErrorMessage('Failed to add item to cart');
        }
      });
  }

  /**
   * Add film to cart (Rent)
   */
  addToCartRent(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.film || this.loadingRent) return;

    this.loadingRent = true;

    const request: AddToCartRequest = {
      filmId: this.film.id,
      isRent: true,
      quantity: 1
    };

    this.cartService.addToCart(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadingRent = false;
          this.showSuccessMessage(`"${this.film.title}" added to cart (Rent)`);
        },
        error: (err: unknown) => {
          this.loadingRent = false;
          console.error('Add to cart error:', err);
          this.showErrorMessage('Failed to add item to cart');
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
    this.editFilm = { ...this.film };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  submitEdit(): void {
    if (!this.editFilm) return;

    this.filmService.updateMovie(this.editFilm.id, this.editFilm).subscribe({
      next: () => {
        this.film = { ...this.editFilm };
        this.showEditModal = false;
      },
      error: err => {
        console.error('UPDATE FAILED', err);
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.film) return;

    this.filmService.deleteMovie(this.film.id).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.router.navigate(['/movies']);
      },
      error: err => {
        this.showDeleteModal = false;
        console.error('Delete failed', err);
      }
    });
  }

  /**
   * Show success message (you can replace with a toast/snackbar service)
   */
  private showSuccessMessage(message: string) {
    console.log('✓', message);
    // TODO: Replace with your notification service
    // Example: this.toastService.success(message);
  }

  /**
   * Show error message (you can replace with a toast/snackbar service)
   */
  private showErrorMessage(message: string) {
    console.error('✗', message);
    alert(message); // Temporary solution
    // TODO: Replace with your notification service
    // Example: this.toastService.error(message);
  }
}
