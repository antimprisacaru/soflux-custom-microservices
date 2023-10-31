import { Role } from '@soflux/ui/shared/domain';
import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserFacade } from '@soflux/ui/shared/store';
import { map } from 'rxjs';

export function userRoleGuard(roles: Role[]): CanMatchFn {
  return () => {
    const userFacade = inject(UserFacade);

    return userFacade.currentUserRole$.pipe(
      map((role) => roles.includes(role))
    );
  };
}
