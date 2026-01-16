import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MoviesComponent } from './movies/movies.component';
import { ProductsComponent } from './products/products.component';
import { WishlistComponent } from './Wishlist/wishlist.component';
import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';

const routes: Routes = [
  // Home / Public layout
  {
    path: '',
    component: PublicLayoutComponent
  },

  // Specifične rute
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'my-movies',
    component: MyMoviesComponent
  },

  // Wildcard - samo na kraju!
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
