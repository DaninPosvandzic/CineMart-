import { Component, OnInit } from '@angular/core';
import { MovieService,Movie } from '../../modules/shared/services/movie.service';

@Component({
  standalone:false,
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss'],
})
export class AdminMoviesComponent implements OnInit {

  movies: Movie[] = [];
  loading = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (res) => {
        this.movies = res.items; // ⬅️ BITNO
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load movies', err);
        this.loading = false;
      }
    });
  }

  deleteMovie(id: number): void {
    if (!confirm('Delete this movie?')) return;

    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(m => m.id !== id);
    });
  }
}
