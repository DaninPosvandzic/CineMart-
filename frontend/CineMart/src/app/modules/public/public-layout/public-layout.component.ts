import {Component, inject, OnInit} from '@angular/core';
import {AuthFacadeService} from '../../../core/services/auth/auth-facade.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {
  private auth = inject(AuthFacadeService);

  isAuthenticated = this.auth.isAuthenticated;
  ngOnInit(): void {
  }
}
