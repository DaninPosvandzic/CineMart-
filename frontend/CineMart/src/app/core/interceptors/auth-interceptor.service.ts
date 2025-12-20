// src/app/core/interceptors/auth.interceptor.ts
import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthFacadeService } from '../services/auth/auth-facade.service';

// Global state for refresh (shared between requests)
let refreshInProgress = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

/**
 * HTTP interceptor koji:
 * 1) Dodaje Authorization header sa access tokenom
 * 2) Rješava 401 greške refreshom tokena
 * 3) Pokušava ponovo originalni request s novim tokenom
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthFacadeService);

  // 1) Preskoči auth endpoint-e
  if (isAuthEndpoint(req.url)) {
    return next(req);
  }

  // 2) Dodaj Authorization header ako postoji token
  const accessToken = auth.getAccessToken();
  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  // 3) Handle 401 → refresh → retry
  return next(authReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return handle401Error(authReq, next, auth);
      }
      return throwError(() => err);
    })
  );
};

/**
 * Preskoči auth endpoint-e (login, refresh, logout)
 */
function isAuthEndpoint(url: string): boolean {
  return url.includes('/Auth/');
}

/**
 * Rješava 401 grešku refreshom tokena i retry request-a
 */
function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  auth: AuthFacadeService
): Observable<any> {
  const refreshToken = auth.getAccessToken(); // koristi facade za dohvat tokena

  // Nema refresh tokena → redirect na login
  if (!refreshToken) {
    auth.redirectToLogin();
    return throwError(() => new Error('No refresh token'));
  }

  // Ako je refresh već u tijeku → čekaj novi token
  if (refreshInProgress) {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        const cloned = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : req;
        return next(cloned);
      })
    );
  }

  // Pokreni refresh
  refreshInProgress = true;
  refreshTokenSubject.next(null);

  return auth.refresh().pipe(
    switchMap((res) => {
      refreshInProgress = false;
      const newAccessToken = res.accessToken;
      refreshTokenSubject.next(newAccessToken);

      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${newAccessToken}` }
      });

      return next(clonedReq);
    }),
    catchError((error) => {
      refreshInProgress = false;
      refreshTokenSubject.next(null);
      auth.redirectToLogin();
      return throwError(() => error);
    })
  );
}
