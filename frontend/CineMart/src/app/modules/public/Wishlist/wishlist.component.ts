import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
isAuthenticated(): any {
throw new Error('Method not implemented.');
}

  wishlist$!: Observable<any[]>;

  constructor(private wishlistService: WishlistService) {
    this.wishlist$ = this.wishlistService.wishlist$;
  }

  remove(movieId: number) {
    this.wishlistService.remove(movieId);
  }
}
