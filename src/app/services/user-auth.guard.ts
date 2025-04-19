import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/']);
    return false;
  }

  const userData = JSON.parse(token);

  if (userData.role === 'admin') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
