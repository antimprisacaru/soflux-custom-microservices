import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserFacade } from '@soflux/ui/shared/store';
import { map } from 'rxjs';

export const isSignedInGuard: CanActivateFn = () => {
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  return userFacade.currentUser$.pipe(
    map((user) => (user ? true : router.parseUrl('/login')))
  );
};
