import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../api-services/filmManagement/film-api.service';
import { Film } from '../../../api-services/filmManagement/film-api.model';

@Component({
  selector: 'featured-slider',
  standalone: false,
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.scss'],
})
class FeaturedSliderComponent implements OnInit {
  films: Film[] = [];
  currentIndex = 0;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getAll().subscribe({
      next: (res: Film[]) => {
        this.films = res.slice(0, 6);
      },
      error: (err: unknown) => {
        console.error('Greška pri dohvaćanju filmova:', err);
      }
    });
  }

  get currentFilm(): Film | undefined {
    return this.films[this.currentIndex];
  }

  nextFilm() {
    this.currentIndex = (this.currentIndex + 1) % this.films.length;
  }

  prevFilm() {
    this.currentIndex = (this.currentIndex - 1 + this.films.length) % this.films.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}

export default FeaturedSliderComponent;
