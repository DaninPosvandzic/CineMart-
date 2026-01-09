import {NgModule} from '@angular/core';

import {ClientRoutingModule} from './client-routing-module';
import {SharedModule} from '../shared/shared-module';
import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    MyMoviesComponent,
    MoviePageComponent,
    AddMovieComponent,
    UserProfileComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule,
  ],
  exports: [
    MoviePageComponent
  ]
})
export class ClientModule { }
