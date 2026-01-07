import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { CreateFilmDto } from '../../../api-services/filmManagement/film-api.model';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { Genre } from '../../../api-services/filmManagement/genre-api.model';
import { GenreApiService } from '../../../api-services/filmManagement/genre-api.service';
import { Director } from '../../../api-services/filmManagement/director-api.model';
import { DirectorApiService } from '../../../api-services/filmManagement/director-api.service';
import { DialogHelperService } from '../../../modules/shared/services/dialog-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  standalone: false,
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  genres: Genre[] = [];
  directors: Director[] = [];
  isSubmitting = false;
  currentYear = new Date().getFullYear();

  movie: CreateFilmDto = {
    title: '',
    releaseYear: new Date().getFullYear(),
    purchasePrice: 0,
    rentPrice: 0,
    genreId: undefined,
    directorId: undefined,
    description: undefined,
    pictureUrl: undefined,
    trailerUrl: undefined
  };

  constructor(
    private filmService: FilmService,
    private authService: AuthFacadeService,
    private genreService: GenreApiService,
    private directorService: DirectorApiService,
    private dialogHelper: DialogHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadDirectors();
  }

  loadGenres(): void {
    this.genreService.getAll().subscribe({
      next: (data: any) => {
        this.genres = data;
      },
      error: (err: unknown) => {
        console.error('Error fetching genres:', err);
        this.dialogHelper.showError(
          'DIALOGS.TITLES.ERROR',
          'MOVIES.DIALOGS.ERROR_LOAD_GENRES'
        );
      }
    });
  }

  loadDirectors(): void {
    this.directorService.getAll().subscribe({
      next: (data: Director[]) => {
        this.directors = data;
      },
      error: (err: unknown) => {
        console.error('Error fetching directors:', err);
        this.dialogHelper.showError(
          'DIALOGS.TITLES.ERROR',
          'MOVIES.DIALOGS.ERROR_LOAD_DIRECTORS'
        );
      }
    });
  }

  submitMovie(): void {
    // Provjera autentifikacije
    if (!this.authService.isAuthenticated()) {
      this.dialogHelper.showWarning(
        'DIALOGS.TITLES.WARNING',
        'MOVIES.DIALOGS.NOT_AUTHENTICATED'
      );
      return;
    }

    // Dodatna validacija prije slanja
    if (!this.isFormValid()) {
      this.dialogHelper.showWarning(
        'DIALOGS.TITLES.WARNING',
        'MOVIES.DIALOGS.INCOMPLETE_FORM'
      );
      return;
    }

    this.isSubmitting = true;
    const payload = { ...this.movie };

    this.filmService.createFilm(payload).subscribe({
      next: (id: number) => {
        this.isSubmitting = false;

        // Prikaži success dialog
        this.dialogHelper.showSuccess(
          'DIALOGS.TITLES.SUCCESS',
          'MOVIES.DIALOGS.SUCCESS_CREATE',
          { title: this.movie.title }
        ).subscribe(() => {
          // Redirect na home page nakon zatvaranja dialoga
          this.router.navigate(['/']);
        });
      },
      error: (err: unknown) => {
        this.isSubmitting = false;
        console.error('Error adding movie:', err);

        this.dialogHelper.showError(
          'DIALOGS.TITLES.ERROR',
          'MOVIES.DIALOGS.ERROR_CREATE'
        );
      }
    });
  }

  // Dodatna validacija
  private isFormValid(): boolean {
    return !!(
      this.movie.title?.trim() &&
      this.movie.releaseYear > 1800 &&
      this.movie.releaseYear <= new Date().getFullYear() + 5 &&
      this.movie.purchasePrice >= 0 &&
      this.movie.rentPrice >= 0 &&
      this.movie.genreId
    );
  }

  resetForm(): void {
    this.movie = {
      title: '',
      releaseYear: new Date().getFullYear(),
      purchasePrice: 0,
      rentPrice: 0,
      genreId: undefined,
      directorId: undefined,
      description: undefined,
      pictureUrl: undefined,
      trailerUrl: undefined
    };
  }
}
