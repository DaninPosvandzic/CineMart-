import { NgModule } from '@angular/core';   // ⬅️ OVO MORA BITI TU
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientRoutingModule } from './client-routing-module';
import { SharedModule } from '../shared/shared-module';

import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditMovieComponent } from '../../pages/movies/edit-movie/edit-movie.component';
import { AddProductComponent  } from './add-product/add-product.component';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  declarations: [
    MyMoviesComponent,
    MoviePageComponent,
    AddMovieComponent,
    UserProfileComponent,
    EditMovieComponent,
    AddProductComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule {}

