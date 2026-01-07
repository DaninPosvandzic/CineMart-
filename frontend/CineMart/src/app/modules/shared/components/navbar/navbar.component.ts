import { Component, inject } from '@angular/core';
import {AuthFacadeService} from '../../../../core/services/auth/auth-facade.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private auth = inject(AuthFacadeService);

  // expose signals to template
  isAuthenticated = this.auth.isAuthenticated;
  isAdmin = this.auth.isAdmin;
  isUser = this.auth.isUser;

  logout(): void {
    this.auth.logout().subscribe();
  }

  mobileMenuActive = false;

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }
}
