import { Component, computed, inject } from '@angular/core';
import {AuthFacadeService} from '../../../core/services/auth/auth-facade.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false
})
export class UserProfileComponent {

  private authFacade = inject(AuthFacadeService);

  user = this.authFacade.currentUser;
  isAuthenticated = this.authFacade.isAuthenticated;

  fullName = computed(() => {
    const u = this.user();
    if (!u) return '';
    return u.email.split('@')[0];
  });

  logout(): void {
    this.authFacade.logout().subscribe();
  }
}
