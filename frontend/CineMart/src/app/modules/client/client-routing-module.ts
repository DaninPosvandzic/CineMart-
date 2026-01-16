import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviePageComponent} from './movie-page/movie-page.component';
import {myAuthData, myAuthGuard} from '../../core/guards/my-auth-guard';
import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AddProductComponent} from './add-product/add-product.component';
import {ProductPageComponent} from './product-page/product-page.component';

const routes: Routes = [
  {
    path: 'movie/:id',
    component: MoviePageComponent,
    canActivate: [myAuthGuard],
    data: myAuthData({requireAuth: true})
  },

  {
    path: 'my-movies',
    component: MyMoviesComponent
  },

  {
    path: 'add-movie',
    component: AddMovieComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'product/:id',
    component: ProductPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
