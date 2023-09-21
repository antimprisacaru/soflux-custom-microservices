import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Current User': props<{ redirectTo?: string }>(),
    'Load Current User Success': props<{ currentUser: User; redirectTo?: string }>(),
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ jwt: JwtResponseBody }>(),
    Logout: emptyProps(),
  },
});
