import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';

export const authGuard: CanActivateFn = () => {

  // Injectamos el servicio authService y el router
  const authService = inject(AuthService);

  const router = inject(Router);

  // Verificamos si existe un usuario logueado, si existe regresa true

  if(authService.isLoggedIn())
  {
    return true;
  }

  // Si no existe devuelve al usuario al home

  return router.createUrlTree(['']);


};
