import { Component, inject } from '@angular/core'; 
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/components/base-classes/base-component';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import { DialogHelperService } from '../../../modules/shared/services/dialog-helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false,
})
export class RegisterComponent extends BaseComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthFacadeService);
  private router = inject(Router);
  private dialog = inject(DialogHelperService);

  hidePassword = true;
  hideConfirm = true;

  form = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(group: any) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.form.invalid || this.isLoading) return;

    this.startLoading();

    const payload = {
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.stopLoading();
        this.dialog
          .showSuccess('Account created!', 'You can now log in')
          .subscribe(() => this.router.navigate(['/auth/login']));
      },
      error: () => {
        this.stopLoading();
        this.dialog.showError(
          'Registration failed',
          'Please try again'
        ).subscribe();
      },
    });
  }
}
