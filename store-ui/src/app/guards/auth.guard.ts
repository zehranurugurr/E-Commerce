import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const roles = route.data?.['roles'] as string[] | undefined;
  if (roles && roles.length > 0) {
    const userRole = authService.getRole();
    if (!userRole || !roles.includes(userRole)) {
      router.navigate(['/home']);
      return false;
    }
  }

  return true;
};
