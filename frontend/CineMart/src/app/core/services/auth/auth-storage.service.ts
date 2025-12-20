import { Injectable } from '@angular/core';
import {
  LoginCommandDto,
  RefreshTokenCommandDto
} from '../../../api-services/auth/auth-api.model';

/**
 * Low-level service for managing auth data in localStorage.
 * Should be used ONLY by AuthFacadeService.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  // =========================================================
  // STORAGE KEYS
  // =========================================================

  private readonly ACCESS_TOKEN_KEY = 'auth.accessToken';
  private readonly REFRESH_TOKEN_KEY = 'auth.refreshToken';

  private readonly ACCESS_EXPIRES_KEY = 'auth.accessToken.expiresAtUtc';
  private readonly REFRESH_EXPIRES_KEY = 'auth.refreshToken.expiresAtUtc';

  private readonly FINGERPRINT_KEY = 'auth.fingerprint';

  // =========================================================
  // LOGIN / REFRESH
  // =========================================================

  saveLogin(response: LoginCommandDto): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(this.ACCESS_EXPIRES_KEY, response.expiresAtUtc);
  }

  saveRefresh(response: RefreshTokenCommandDto): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(this.ACCESS_EXPIRES_KEY, response.accessTokenExpiresAtUtc);
    localStorage.setItem(this.REFRESH_EXPIRES_KEY, response.refreshTokenExpiresAtUtc);
  }

  // =========================================================
  // FINGERPRINT
  // =========================================================

  getFingerprint(): string | null {
    return localStorage.getItem(this.FINGERPRINT_KEY);
  }

  saveFingerprint(fingerprint: string): void {
    localStorage.setItem(this.FINGERPRINT_KEY, fingerprint);
  }

  hasFingerprint(): boolean {
    return !!this.getFingerprint();
  }

  // =========================================================
  // GETTERS
  // =========================================================

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getAccessTokenExpiresAtUtc(): string | null {
    return localStorage.getItem(this.ACCESS_EXPIRES_KEY);
  }

  getRefreshTokenExpiresAtUtc(): string | null {
    return localStorage.getItem(this.REFRESH_EXPIRES_KEY);
  }

  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }

  // =========================================================
  // CLEARING
  // =========================================================

  /**
   * Clears auth tokens but keeps fingerprint.
   * Fingerprint identifies the device and MUST persist across logins.
   */
  clearAuth(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_EXPIRES_KEY);
    localStorage.removeItem(this.REFRESH_EXPIRES_KEY);
  }

  /**
   * Clears absolutely everything (rarely needed).
   * Use ONLY if you want to reset the device identity.
   */
  clearAll(): void {
    this.clearAuth();
    localStorage.removeItem(this.FINGERPRINT_KEY);
  }
}
