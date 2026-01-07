import {NgModule} from '@angular/core';

import {ClientRoutingModule} from './client-routing-module';
import {SharedModule} from '../shared/shared-module';
import { MyMoviesComponent } from '../../pages/my-movies/my-movies.component';



@NgModule({
  declarations: [
    MyMoviesComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule,
  ]
})
export class ClientModule { }
