import {NgModule} from '@angular/core';

import {ClientRoutingModule} from './client-routing-module';
import {SharedModule} from '../shared/shared-module';
import { MoviePageComponent } from './movie-page/movie-page.component';


@NgModule({
  declarations: [
    MoviePageComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule
  ],
  exports: [
    MoviePageComponent
  ]
})
export class ClientModule { }
