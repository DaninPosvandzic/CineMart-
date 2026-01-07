import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviePageComponent} from './movie-page/movie-page.component';
import {myAuthData, myAuthGuard} from '../../core/guards/my-auth-guard';

const routes: Routes = [
  {
    path: 'movie/:id',
    component: MoviePageComponent,
    canActivate: [myAuthGuard],
    data: myAuthData({ requireAuth: true })
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
