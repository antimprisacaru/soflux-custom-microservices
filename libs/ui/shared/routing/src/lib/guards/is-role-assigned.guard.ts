import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserFacade } from '@soflux/ui/shared/store';
import { map } from 'rxjs';
import { Role } from '@soflux/ui/shared/domain';

export const isRoleAssignedGuard: CanActivateFn = () => {
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  return userFacade.currentUserRole$.pipe(
    map((role) =>
      role && role !== Role.Unassigned ? true : router.parseUrl('/app/setup')
    )
  );
};
