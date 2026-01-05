import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing-module';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { SharedModule } from '../shared/shared-module';
import { RecommendedSectionComponent } from './recommended-section/recommended-section.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import FeaturedSliderComponent from './featured-slider/featured-slider.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    RecommendedSectionComponent,
    FeaturedSliderComponent,
    TopRatedComponent,
  ],
  imports: [
    SharedModule,
    PublicRoutingModule,
  ]
})
export class PublicModule {}
