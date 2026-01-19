import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../modules/shared/services/movie.service';
import { AdminMovieEditDialogComponent } from '../pages/admin-movie-edit-dialog/admin-movie-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  standalone:false,
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss']
})
export class AdminMoviesComponent implements OnInit {

  movies: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'year', 'actions'];

  constructor(
    private movieService: MovieService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
  this.movieService.getAllMovies().subscribe({
    next: res => {
      this.movies = res.items; 
    },
    error: err => console.error(err)
  });
  
}

   deleteMovie(id: number): void {
    if (!confirm('Da li ste sigurni da želite obrisati film?')) return;

    this.movieService.deleteMovie(id).subscribe(() => {
      this.loadMovies();
    });
  }
  editMovie(movie: any) {
  const dialogRef = this.dialog.open(AdminMovieEditDialogComponent, {
    width: '500px',
    data: movie
  });

  dialogRef.afterClosed().subscribe(updated => {
    if (updated) {
      this.loadMovies();
    }
  });
}

}
