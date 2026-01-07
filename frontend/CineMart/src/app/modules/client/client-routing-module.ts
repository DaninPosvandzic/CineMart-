import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviePageComponent} from './movie-page/movie-page.component';
import {myAuthData, myAuthGuard} from '../../core/guards/my-auth-guard';
import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';
import {AddMovieComponent} from './add-movie/add-movie.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
