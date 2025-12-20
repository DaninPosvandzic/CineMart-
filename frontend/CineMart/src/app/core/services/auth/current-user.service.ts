// src/app/core/services/auth/current-user.service.ts
import { Injectable, inject, computed } from '@angular/core';
import { AuthFacadeService } from './auth-facade.service';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private auth = inject(AuthFacadeService);

  /** Readonly signal za UI */
  currentUser = computed(() => this.auth.currentUser());

  isAuthenticated = computed(() => this.auth.isAuthenticated());
  isAdmin = computed(() => this.auth.isAdmin());
  isUser = computed(() => this.auth.isUser());

  /** Snapshot za guards i imperative code */
  get snapshot() {
    return this.auth.currentUser();
  }

  /** Default redirect nakon login-a */
  getDefaultRoute(): string {
    const user = this.snapshot;

    if (!user) return '/login';

    if (user.role === 'Admin') return '/admin';

    return '/client';
  }
}
