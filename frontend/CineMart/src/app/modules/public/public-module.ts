import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing-module';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { SharedModule } from '../shared/shared-module';
import { RecommendedSectionComponent } from './recommended-section/recommended-section.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import FeaturedSliderComponent from './featured-slider/featured-slider.component';
import { MoviesComponent } from './movies/movies.component';
import{ProductsComponent} from './products/products.component';
import { WishlistComponent } from './Wishlist/wishlist.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    RecommendedSectionComponent,
    FeaturedSliderComponent,
    TopRatedComponent,
    MoviesComponent,
    ProductsComponent
     
  ],
  imports: [
    SharedModule,
    PublicRoutingModule,
    WishlistComponent 
  ]
})
export class PublicModule {}
