import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['admin@radi.com', [Validators.required, Validators.email]],
    password: ['password', Validators.required],
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    this.loginError.set(null);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email!, password!)) {
        this.router.navigate(['/admin']);
      } else {
        this.loginError.set('Invalid email or password.');
      }
    }
  }
}
