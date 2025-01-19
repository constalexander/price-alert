import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@/features/auth/services/auth.service';
import { RegisterComponent } from '@/features/auth/components/register/register.component';
import { LoginComponent } from '@/features/auth/components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [ButtonModule, RegisterComponent, LoginComponent],
})
export class HeaderComponent {
  showRegisterDialog = false;
  showLoginDialog = false;

  constructor(private authService: AuthService) {}
}
