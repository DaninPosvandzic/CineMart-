import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {Film} from '../../../api-services/filmManagement/film-api.model';
import {FilmService} from '../../../api-services/filmManagement/film-api.service';

@Component({
  selector: 'app-recommended-section',
  standalone:false,
  templateUrl: './recommended-section.component.html',
  styleUrls: ['./recommended-section.component.scss'],
})
export class RecommendedSectionComponent implements OnInit {
  films: Film[] = [];

  constructor(private filmService: FilmService, private router: Router) {}

  ngOnInit(): void {
    this.filmService.getAll().subscribe({
      next: (res: Film[]) => {
        this.films = res.slice(0, 6); // uzimamo prvih 6 filmova
      },
      error: (err: unknown) => {
        console.error('Greška pri dohvaćanju filmova:', err);
      }
    });
  }

  openMovie(id: number) {
    this.router.navigate(['/client/movie', id]);
  }
}
