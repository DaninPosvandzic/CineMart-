import { Component, OnInit } from '@angular/core';
import {FilmService} from '../../../api-services/filmManagement/film-api.service';


@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  films: any[] = [];

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  searchTerm: string = ''; 
  selectedFilter = 'rating'; // sortBy
  sortAscending = true;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.filmService
      .getAllMovies(
        this.pageNumber,
        this.pageSize,
        this.searchTerm,
        this.selectedFilter,
        this.sortAscending ? 'asc' : 'desc'
      )
      .subscribe((res: any) => {
        this.films = res.items;
        this.totalCount = res.total;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      });
  }

  onSearch() {
    this.pageNumber = 1;
    this.loadMovies();
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadMovies();
  }

  toggleSort() {
    this.sortAscending = !this.sortAscending;
    this.loadMovies();
  }
}
