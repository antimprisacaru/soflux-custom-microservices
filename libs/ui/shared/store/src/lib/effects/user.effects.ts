import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { showMessage, UserActions } from '../actions';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { UserService } from '@soflux/ui/shared/services';
import { Router } from '@angular/router';
import { GraphqlError } from '@soflux/ui/shared/domain';
import { isArray } from '@apollo/client/utilities';

export const loadCurrentUser$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.loadCurrentUser),
      exhaustMap(({ redirectTo }) =>
        userService.loadCurrentUser().pipe(
          map(({ data: { currentUser } }) =>
            UserActions.loadCurrentUserSuccess({ currentUser, redirectTo })
          ),
          catchError((err) => of(UserActions.error(err)))
        )
      )
    );
  },
  { functional: true }
);

export const loadCurrentUserSuccess$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(UserActions.loadCurrentUserSuccess),
      tap(async ({ redirectTo }) => {
        if (redirectTo) {
          await router.navigateByUrl(redirectTo);
        }
      })
    );
  },
  { dispatch: false, functional: true }
);

export const login$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.login),
      exhaustMap(({ email, password }) =>
        userService.login(email, password).pipe(
          map(({ data }) => {
            if (data?.login) {
              return UserActions.loginSuccess({ jwt: data.login });
            }
            throw new Error();
          }),
          catchError((err) => of(UserActions.error({ err })))
        )
      )
    );
  },
  { functional: true }
);

export const loginSuccess$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(UserActions.loginSuccess),
      exhaustMap(({ jwt }) => {
        localStorage.setItem('token', jwt?.token ?? null);
        return of(
          UserActions.loadCurrentUser({ redirectTo: '/app/dashboard' })
        );
      })
    );
  },
  { functional: true }
);

export const logout$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);
    return actions$.pipe(
      ofType(UserActions.logout),
      tap(async () => {
        localStorage.removeItem('token');
        await router.navigateByUrl('/login');
      })
    );
  },
  { dispatch: false, functional: true }
);

export const error$ = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(UserActions.error),
      switchMap(({ err }) => {
        if (isArray(err)) {
          return err.map((error) =>
            showMessage({
              message: {
                data: error.message,
                severity: 'error',
                summary: 'An error has occurred!',
              },
            })
          );
        }
        if (typeof err === 'object' && err.message) {
          return of(
            showMessage({
              message: {
                data: err.message,
                severity: 'error',
                summary: 'An error has occurred!',
              },
            })
          );
        }
        return of(
          showMessage({
            message: {
              data: err,
              severity: 'error',
              summary: 'An error has occurred!',
            },
          })
        );
      })
    );
  },
  { functional: true }
);
