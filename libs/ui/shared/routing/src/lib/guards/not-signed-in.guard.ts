import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserFacade } from '@soflux/ui/shared/store';
import { combineLatest, filter, map } from 'rxjs';

export const notSignedInGuard: CanActivateFn = () => {
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  return combineLatest([userFacade.currentUser$, userFacade.loaded$]).pipe(
    filter(([_, loaded]) => loaded),
    map(([user]) => {
      return !user ? true : router.parseUrl('/app/dashboard');
    })
  );
};
