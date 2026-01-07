import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FilmService} from '../../../api-services/filmManagement/film-api.service';

@Component({
  selector: 'app-movie-page',
  standalone: false,
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  film: any;  // možeš kasnije napraviti interface

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("FILM ID:", id);

    this.filmService.getFilmById(id).subscribe((res:any) => {
      console.log("FILM DATA:", res);
      this.film = res;
    });
  }
}
