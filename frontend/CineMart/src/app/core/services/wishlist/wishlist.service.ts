import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  get wishlist(): any[] {
    return this.wishlistSubject.value;
  }

  add(movie: any) {
    const exists = this.wishlist.some(m => m.id === movie.id);
    if (exists) return;

    const updated = [...this.wishlist, { ...movie, isWishlisted: true }];
    this.wishlistSubject.next(updated);
  }

  remove(movieId: number) {
    const updated = this.wishlist.filter(m => m.id !== movieId);
    this.wishlistSubject.next(updated);
  }

  isWishlisted(movieId: number): boolean {
    return this.wishlist.some(m => m.id === movieId);
  }
}
