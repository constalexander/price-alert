import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@/features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticatedUser()) {
    return true;
  }

  // Store the attempted URL for redirecting
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
