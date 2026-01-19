import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieService } from '../../../modules/shared/services/movie.service';

@Component({
  standalone:false,
  selector: 'app-admin-movie-edit-dialog',
  templateUrl: './admin-movie-edit-dialog.component.html',
  styleUrls: ['./admin-movie-edit-dialog.component.scss'],
})
export class AdminMovieEditDialogComponent {

  movie: any;

  constructor(
    private dialogRef: MatDialogRef<AdminMovieEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private movieService: MovieService
  ) {
    // klon da ne mijenjaš odmah listu
    this.movie = { ...data };
  }

  save() {
  const payload = {
    title: this.movie.title,
    releaseYear: this.movie.releaseYear  
     // 👈 mapiranje
  };

  this.movieService.updateMovie(this.movie.id, payload)
    .subscribe(() => {
      this.dialogRef.close(true);
    });
    console.log(this.movie);

}


  cancel() {
    this.dialogRef.close(false);
  }
}
