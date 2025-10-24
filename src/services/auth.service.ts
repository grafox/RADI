import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'RADI_AUTH';
  isAuthenticated = signal<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  login(email: string, password: string):boolean {
    // Mock authentication: in a real app, you'd call an API
    if (email === 'admin@radi.com' && password === 'password') {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.AUTH_KEY, 'true');
      }
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.AUTH_KEY);
    }
    this.isAuthenticated.set(false);
  }
}
