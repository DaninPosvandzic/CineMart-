// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthFacadeService } from '../services/auth/auth-facade.service';

export const myAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthFacadeService);
  const router = inject(Router);

  const authData = route.data['auth'] as MyAuthRouteData | undefined;

  const requireAuth = authData?.requireAuth === true;
  const requireAdmin = authData?.requireAdmin === true;

  const isAuth = auth.isAuthenticated();

  // 1) Ruta traži auth, a user nije logiran
  if (requireAuth && !isAuth) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Javne rute
  if (!requireAuth) {
    return true;
  }

  const user = auth.currentUser();
  if (!user) {
    router.navigate(['/auth/login']);
    return false;
  }

  // 2) Admin-only
  if (requireAdmin && user.role !== 'Admin') {
    router.navigate(['/']);
    return false;
  }

  return true;
};

export interface MyAuthRouteData {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export function myAuthData(data: MyAuthRouteData) {
  return { auth: data };
}
