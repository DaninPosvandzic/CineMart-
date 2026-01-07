import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '../../../../core/services/auth/auth-facade.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private auth = inject(AuthFacadeService);
  private router = inject(Router);

  // expose signals to template
  isAuthenticated = this.auth.isAuthenticated;
  isAdmin = this.auth.isAdmin;
  isUser = this.auth.isUser;

  // mobile menu
  mobileMenuActive = false;

  // logout modal
  showLogoutModal = false;

  // toast
  showToast = false;
  toastMessage = '';

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  // modal control
  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.auth.logout().subscribe(() => {
      this.showLogoutModal = false;
      this.showToastMessage('Successfully logged out');
      this.router.navigate(['/']);
    });
  }

  // toast
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }

  // listen to ESC key
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event) {
  const e = event as KeyboardEvent;
  if (this.showLogoutModal && e.key === 'Escape') {
    this.closeLogoutModal();
  }
}


  // click outside modal
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeLogoutModal();
    }
  }
}
