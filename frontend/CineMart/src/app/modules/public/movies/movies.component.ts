import { Component, OnInit } from '@angular/core';
import {FilmService} from '../../../api-services/filmManagement/film-api.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  films: any[] = [];

  pageNumber: number = 1;
  pageSize: number = 8;
  totalCount: number = 0;
  totalPages: number = 1;

  searchTerm: string = '';
  selectedFilter = 'rating'; // sortBy
  sortAscending = true;

 constructor(
  private filmService: FilmService,
  private cartService: CartService,
  private wishlistService: WishlistService
) {}


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
        this.films.forEach(film => {
  film.isWishlisted = this.wishlistService.isWishlisted(film.id);
});
        this.totalCount = res.total;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      });
  }
addToCart(film: any, type: 'buy' | 'rent') {
  this.cartService.addToCart({
    movieId: film.id,
    title: film.title,
    price: type === 'buy' ? film.purchasePrice : film.rentPrice,
    type
  });
}
// toggleWishlist(film: any) {
//   if (this.wishlistService.isWishlisted(film.id)) {
//     this.wishlistService.remove(film.id);
//     film.isWishlisted = false;
//   } else {
//     this.wishlistService.add(film);
//     film.isWishlisted = true;
//   }
// }
toggleWishlist(film: any) {
  if (this.wishlistService.isWishlisted(film.id)) {
    this.wishlistService.remove(film.id);
    film.isWishlisted = false;
  } else {
    this.wishlistService.add({
      id: film.id,
      title: film.title,
      genreName: film.genreName,
      pictureUrl: film.pictureUrl, // 🔥 KLJUČNO
    });
    film.isWishlisted = true;
  }
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
