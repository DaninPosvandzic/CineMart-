import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {myAuthData, myAuthGuard} from './core/guards/my-auth-guard';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {
  path: 'admin',
  loadChildren: () =>
    import('./modules/admin/admin-module').then(m => m.AdminModule)
},

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'client',
    canActivate: [myAuthGuard],
    data: myAuthData({ requireAuth: true }),// bilo ko logiran
    loadChildren: () =>
      import('./modules/client/client-module').then(m => m.ClientModule)
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/public/public-module').then(m => m.PublicModule)
  },
  



  // fallback 404
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top', 
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
