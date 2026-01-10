// src/app/core/services/auth/auth-facade.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, catchError, map } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

import { AuthApiService } from '../../../api-services/auth/auth-api.service';
import {
  LoginCommand,
  LoginCommandDto,
  LogoutCommand,
  RefreshTokenCommand,
  RefreshTokenCommandDto,
  RegisterCommand,
} from '../../../api-services/auth/auth-api.model';

import { AuthStorageService } from './auth-storage.service';
import { CurrentUserDto } from './current-user.dto';
import { JwtPayloadDto } from './jwt-payload.dto';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
 
register(payload: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
  return this.api.register(payload);
}
  private api = inject(AuthApiService);
  private storage = inject(AuthStorageService);
  private router = inject(Router);

  // =========================================================
  // STATE
  // =========================================================

  private _currentUser = signal<CurrentUserDto | null>(null);
  currentUser = this._currentUser.asReadonly();

  // =========================================================
  // COMPUTED
  // =========================================================

  isAuthenticated = computed(() => !!this._currentUser());
  isAdmin = computed(() => this._currentUser()?.role === 'Admin');
  isUser = computed(() => this._currentUser()?.role === 'User');

  constructor() {
    this.initializeFromToken();
  }

  // =========================================================
  // PUBLIC API
  // =========================================================

  login(payload: LoginCommand): Observable<void> {
    return this.api.login(payload).pipe(
      tap(response => {
        this.storage.saveLogin(response);
        this.decodeAndSetUser(response.accessToken);
      }),
      map(() => void 0)
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.storage.getRefreshToken();
    const fingerprint = this.storage.getFingerprint();

    this.clearUserState();

    if (!refreshToken || !fingerprint) return of(void 0);

    return this.api
      .logout({ refreshToken, fingerprint })
      .pipe(catchError(() => of(void 0)));
  }

  refresh(): Observable<RefreshTokenCommandDto> {
    const refreshToken = this.storage.getRefreshToken();
    const fingerprint = this.storage.getFingerprint();

    if (!refreshToken || !fingerprint) {
      throw new Error('Missing refresh token or fingerprint');
    }

    return this.api.refresh({ refreshToken, fingerprint }).pipe(
      tap(response => {
        this.storage.saveRefresh(response);
        this.decodeAndSetUser(response.accessToken);
      })
    );
  }

  redirectToLogin(): void {
    this.clearUserState();
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this.storage.getAccessToken();
  }

  // =========================================================
  // PRIVATE HELPERS
  // =========================================================

  private initializeFromToken(): void {
    const token = this.storage.getAccessToken();
    if (token) {
      this.decodeAndSetUser(token);
    }
  }

  private decodeAndSetUser(token: string): void {
  try {
    const payload: any = jwtDecode(token);

    const role =
      payload.role ||
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    const user: CurrentUserDto = {
      userId: Number(payload.sub),
      email: payload.email,
      role: role ?? 'User',
      tokenVersion: Number(payload.ver),
    };

    this._currentUser.set(user);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    this._currentUser.set(null);
  }
}


  private clearUserState(): void {
    this._currentUser.set(null);
    this.storage.clearAuth();
  }
  isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const payload = jwtDecode<JwtPayloadDto>(token);
    
    return (payload.exp * 1000) < Date.now();
  } catch (error) {
    console.error('Failed to decode JWT token for expiration check:', error);
    return true;
  }
}

checkTokenAndLogout(): void {
  const token = this.getAccessToken();
  if (!token || this.isTokenExpired(token)) {
    console.log('Token expired or missing, logging out');
    this.clearUserState();
    this.router.navigate(['/login']); 
  }
}
restoreSessionFromBackend(): void {
  const refreshToken = this.storage.getRefreshToken();
  const fingerprint = this.storage.getFingerprint();

  if (!refreshToken || !fingerprint) {
    this.clearUserState();
    return;
  }

  this.api.refresh({ refreshToken, fingerprint }).subscribe({
    next: response => {
      this.storage.saveRefresh(response);
      this.decodeAndSetUser(response.accessToken);
    },
    error: () => {
      this.clearUserState();
      this.router.navigate(['/login']);
    }
  });
}
}
