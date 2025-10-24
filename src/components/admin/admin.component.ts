import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
