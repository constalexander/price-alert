import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@/features/auth/services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.isAuthenticatedUser()) {
      router.navigate(['/']);
      return false;
    }

    const userRole = authService.getUserRole();
    if (allowedRoles.includes(userRole)) {
      return true;
    }

    router.navigate(['/']); // Redirect to home if role not allowed
    return false;
  };
};
