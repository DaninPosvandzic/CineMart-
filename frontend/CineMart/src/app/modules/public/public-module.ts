import {NgModule} from '@angular/core';

import {PublicRoutingModule} from './public-routing-module';
import {PublicLayoutComponent} from './public-layout/public-layout.component';
import {SharedModule} from '../shared/shared-module';
import { RecommendedSectionComponent } from './recommended-section/recommended-section.component';


@NgModule({
  declarations: [
    PublicLayoutComponent,
    RecommendedSectionComponent,
  ],
  imports: [
    SharedModule,
    PublicRoutingModule,
  ]
})
export class PublicModule { }
