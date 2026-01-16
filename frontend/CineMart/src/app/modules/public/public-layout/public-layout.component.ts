import { Component, inject, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {
  private auth = inject(AuthFacadeService);
  private router = inject(Router);

  isAuthenticated = this.auth.isAuthenticated;

  // flag da li smo na home ruti
  isHomeRoute = true;

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Ako je URL home, prikazujemo hero i slider
        this.isHomeRoute = event.urlAfterRedirects === '/';
      });
  }
}