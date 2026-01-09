import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';

@Component({
  selector: 'app-movie-page',
  standalone: false,
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  film: any;
  stars = [1, 2, 3, 4, 5];

  userRating = 0;
  averageRating = 0;
  votes = 0;
  hasRated = false;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.filmService.getFilmById(id).subscribe(res => {
      this.film = res;
      this.averageRating = res.averageRating;
    });

    this.loadRating(id);
  }

  loadRating(movieId: number) {
    this.filmService.getRating(movieId).subscribe(res => {
      this.userRating = res.userRating || 0;
      this.averageRating = res.average;
      this.votes = res.votes;
      this.hasRated = !!res.userRating;
    });
  }

 rateMovie(star: number) {
  if (!this.film?.id) return;

  this.filmService.rateMovie(this.film.id, star).subscribe({
    next: (res) => {
      this.userRating = res.userRating;     
      this.averageRating = res.average;     
      this.votes = res.votes;               
      this.hasRated = true;
    },
    error: (err) => {
      console.error('Greška pri ocjenjivanju:', err);
    }
  });
}

onStarClick(star: number) {
  if (this.hasRated) return;
  this.rateMovie(star);
}
}

