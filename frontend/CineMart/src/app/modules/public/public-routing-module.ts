import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MoviesComponent } from './movies/movies.component'; // importuj komponentu

import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';
const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  { path: '**', redirectTo: '' },
  { path: 'my-movies', component: MyMoviesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
