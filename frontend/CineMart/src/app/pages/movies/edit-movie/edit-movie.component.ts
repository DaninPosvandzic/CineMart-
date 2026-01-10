import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  standalone:false,
  selector: 'app-movie-edit',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  film: any;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private router: Router,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.getFilmById(id).subscribe(res => this.film = res);
  }

 submitForm(): void {
   console.log('submitForm called');

  const payload = {
    title: this.film.title,
    description: this.film.description,
    rentPrice: this.film.rentPrice,
    purchasePrice: this.film.purchasePrice
  };

  this.filmService.updateMovie(this.film.id, payload).subscribe({
    next: (res) => {
      console.log('Update successful', res);
      
     this.snackBar.open('Film uspješno izmijenjen 🎬', 'OK', {
     duration: 3000,
     horizontalPosition: 'center',
     verticalPosition: 'top'
    });

    },
    error: err => {
      console.error('Update failed', err);
      this.snackBar.open(
        'Greška pri izmjeni filma ❌',
        'Zatvori',
        { duration: 4000 }
      );
    }
  });
}


  cancelEdit(): void {
    this.router.navigate(['/movies', this.film.id]);
  }
}
