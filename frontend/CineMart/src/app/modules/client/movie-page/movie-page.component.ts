import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';

@Component({
  selector: 'app-movie-page',
  standalone: false,
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  film: any;

  // ===== Rating =====
  stars = [1, 2, 3, 4, 5];
  userRating = 0;
  averageRating = 0;
  votes = 0;
  hasRated = false;
  comment = '';

  // ===== Modals =====
  showDeleteModal = false;
  showEditModal = false;

  editFilm: any = null;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private auth: AuthFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.filmService.getFilmById(id).subscribe(res => {
      this.film = res;
      this.averageRating = res.averageRating;
      console.log(this.film.comments);
    });

    this.loadRating(id);
  }

  // ===== Rating =====
  loadRating(movieId: number): void {
    this.filmService.getRating(movieId).subscribe(res => {
      this.userRating = res.userRating || 0;
      this.averageRating = res.average;
      this.votes = res.votes;
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
        this.averageRating = updatedFilm.averageRating ?? 0;
        this.hasRated = true;
        this.userRating = 0;
        this.comment = '';
      },
      error: (err) => console.error('Rating failed', err)
    });
}





  // ===== Edit =====
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

  // ===== Delete =====
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

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
