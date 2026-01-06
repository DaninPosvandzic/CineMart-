import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/components/base-classes/base-component';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { LoginCommand } from '../../../api-services/auth/auth-api.model';
import { CurrentUserService } from '../../../core/services/auth/current-user.service';
import { DialogHelperService } from '../../../modules/shared/services/dialog-helper.service';
import { DialogButton } from '../../../modules/shared/models/dialog-config.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:false,
})
export class LoginComponent extends BaseComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthFacadeService);
  private router = inject(Router);
  private currentUser = inject(CurrentUserService);
  private dialog = inject(DialogHelperService);

  hidePassword = true;

  form = this.fb.group({
    email: ['admin@market.local', [Validators.required, Validators.email]],
    password: ['Admin123!', [Validators.required]],
    rememberMe: [false],
  });

  onSubmit(): void {
    if (this.form.invalid || this.isLoading) return;

    this.startLoading();

    const payload: LoginCommand = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      fingerprint: null,
    };

    this.auth.login(payload).subscribe({
      next: () => {
        this.stopLoading();

        this.dialog
          .showSuccess(
            'Login successful!',
            'Welcome back!'
          )
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      },

      error: () => {
        this.stopLoading();
        this.dialog.showError(
          'Login failed!',
          'Wrong username or password'
        ).subscribe();
      }
    });
  }
}
