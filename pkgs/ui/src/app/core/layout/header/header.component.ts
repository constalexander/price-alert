import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@/features/auth/services/auth.service';
import { RegisterComponent } from '@/features/auth/components/register/register.component';
import { LoginComponent } from '@/features/auth/components/login/login.component';
import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [ButtonModule, RegisterComponent, LoginComponent, AsyncPipe, NgIf],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  showRegisterDialog = false;
  showLoginDialog = false;
  isAuthenticated$ = this.authService.currentUser$.pipe();

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
