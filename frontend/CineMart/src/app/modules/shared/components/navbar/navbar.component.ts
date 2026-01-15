import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '../../../../core/services/auth/auth-facade.service';
import { CartService } from '../../../../core/services/cart/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private auth = inject(AuthFacadeService);
  private router = inject(Router);
  private cartService = inject(CartService);

  // expose signals to template
  isAuthenticated = this.auth.isAuthenticated;
  isAdmin = this.auth.isAdmin;
  isUser = this.auth.isUser;

   cartCount$ = this.cartService.cartCount$;

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
goToCart() {
  this.router.navigate(['/cart']).then(() => {
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 0);
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
