import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../modules/shared/services/movie.service';

@Component({
  standalone:false,
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss']
})
export class MyMoviesComponent implements OnInit {

  movies: any[] = [];
  userId = 1; // privremeno

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMyMovies(this.userId).subscribe({
      next: data => this.movies = data,
      error: err => console.error(err)
    });
  }
  deleteMovie(movieId: number) {
  if (!confirm('Delete this movie?')) return;

  this.movieService.deleteMovie(movieId).subscribe({
    next: () => {
      this.movies = this.movies.filter(m => m.id !== movieId);
    },
    error: err => console.error('Delete failed', err)
  });
}
}
