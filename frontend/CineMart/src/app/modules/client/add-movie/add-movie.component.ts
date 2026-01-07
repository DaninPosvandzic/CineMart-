import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { CreateFilmDto } from '../../../api-services/filmManagement/film-api.model';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import {Genre} from '../../../api-services/filmManagement/genre-api.model';
import {GenreApiService} from '../../../api-services/filmManagement/genre-api.service';


@Component({
  selector: 'app-add-movie',
  standalone: false,
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  // Lista koja će čuvati žanrove iz baze
  genres: Genre[] = [];

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

  showSuccess = false;
  successMessage = '';

  constructor(
    private filmService: FilmService,
    private authService: AuthFacadeService,
    private genreService: GenreApiService // Ubrizgan servis za žanrove
  ) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  // Metoda za dohvaćanje žanrova sa API-ja
  loadGenres(): void {
    this.genreService.getAll().subscribe({
      next: (data:any) => {
        this.genres = data;
      },
      error: (err:unknown) => {
        console.error('Error fetching genres:', err);
      }
    });
  }

  submitMovie() {
    if (!this.authService.isAuthenticated()) {
      alert('You must be logged in to add a movie.');
      return;
    }

    // Osiguravamo da su numeričke vrijednosti ispravnog tipa prije slanja
    const payload = { ...this.movie };

    this.filmService.createFilm(payload).subscribe({
      next: (id:any) => {
        this.successMessage = `Movie added successfully!`;
        this.showSuccess = true;
        this.resetForm();
      },
      error: (err:unknown) => {
        console.error('Error adding movie:', err);
        alert('Error adding movie. Check console for details.');
      }
    });
  }

  resetForm() {
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
