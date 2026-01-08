import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { Film } from '../../../api-services/filmManagement/film-api.model';

@Component({
  selector: 'top-rated',
  standalone: false,
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent implements OnInit {
  topRatedMovies: Film[] = [];
  allFilms: Film[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getAll().subscribe({
      next: (res: Film[]) => {
        this.allFilms = res;
        this.sortByRating();
      },
      error: (err: unknown) => {
        console.error('Greška pri dohvaćanju filmova:', err);
      }
    });
  }

  sortByRating() {
    this.topRatedMovies = [...this.allFilms]
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 10);
  }
}
