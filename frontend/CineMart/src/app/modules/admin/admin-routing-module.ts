import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminMoviesComponent } from '../../admin/admin-movies/admin-movies.component';
import { AdminOrdersComponent } from '../../admin/admin-orders/admin-orders.component';
import { AdminDashboardComponent } from '../../admin/admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from '../../admin/admin-categories/admin-categories.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'movies',
        component: AdminMoviesComponent,
      },
      { path: 'dashboard',
         component: AdminDashboardComponent 
      },
      { path: 'categories', 
        component: AdminCategoriesComponent 
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
      },
      {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
