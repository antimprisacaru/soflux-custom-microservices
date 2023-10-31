import { UserService } from '@soflux/ui/shared/services';
import { UserFacade } from '@soflux/ui/shared/store';
import { catchError, lastValueFrom, map, of } from 'rxjs';

export const appInitializerFactory =
  (userService: UserService, userFacade: UserFacade) => async () =>
    await lastValueFrom(
      userService.loadCurrentUser().pipe(
        map(({ data: { currentUser } }) =>
          userFacade.loadCurrentUserSuccess(currentUser)
        ),
        catchError(() => of(null))
      )
    );
