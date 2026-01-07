import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';
const routes: Routes = [
  {
    path: 'my-movies',
    component: MyMoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
