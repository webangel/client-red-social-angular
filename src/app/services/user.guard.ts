// auth.guard.ts
import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { UserService } from './user.service';

export const authGuard = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  // Verificación más segura
  const token = userService.getToken();
  const identity = userService.getIdentity();

  // 1. Verificar si hay token
  if (!token) {
    return redirectToLogin(router);
  }

  // 2. Verificar si identity existe y tiene rol
  if (!identity || !identity.role) {
    return redirectToLogin(router);
  }

  // 3. Verificar roles permitidos
  const allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
  if (allowedRoles.includes(identity.role)) {
    return true;
  }

  // Redirigir si no cumple los requisitos
  return redirectToLogin(router);
};

// Función helper para redirección
const redirectToLogin = (router: Router): UrlTree => {
  // Opcional: Guardar la URL actual para redirección post-login
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: router.routerState.snapshot.url }
  });
};
