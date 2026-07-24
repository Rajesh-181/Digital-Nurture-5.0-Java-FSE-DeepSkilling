import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Allow navigation if the user is logged in
  if (authService.isLoggedIn) {
    return true;
  }

  // Otherwise, redirect to the home page and block routing
  console.warn('Access denied by AuthGuard. Redirecting to home...');
  router.navigate(['/home']);
  return false;
};
