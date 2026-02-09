import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== '') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
