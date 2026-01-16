import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing-module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {AdminSettingsComponent} from './admin-settings/admin-settings.component';
import {SharedModule} from '../shared/shared-module';
import { AdminMoviesComponent } from '../../admin/admin-movies/admin-movies.component';
import { AdminOrdersComponent } from '../../admin/admin-orders/admin-orders.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminSettingsComponent,
    AdminMoviesComponent,
    AdminOrdersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
