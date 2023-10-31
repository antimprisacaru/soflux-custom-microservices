import { Store } from '@ngrx/store';

import { inject, Injectable } from '@angular/core';
import { UserActions } from '../actions';
import { User } from '@soflux/ui/shared/domain';
import { userFeature } from '../features';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject(Store);

  /* State */
  currentUser$ = this.store.select(userFeature.selectCurrentUser);
  currentUserRole$ = this.store.select(userFeature.currentUserRole);
  loading$ = this.store.select(userFeature.loading);
  loaded$ = this.store.select(userFeature.loaded);

  loadCurrentUser(redirectTo?: string) {
    this.store.dispatch(UserActions.loadCurrentUser({ redirectTo }));
  }

  loadCurrentUserSuccess(currentUser: User, redirectTo?: string) {
    this.store.dispatch(
      UserActions.loadCurrentUserSuccess({ currentUser, redirectTo })
    );
  }

  login(input: { email: string; password: string }) {
    this.store.dispatch(UserActions.login(input));
  }

  logout() {
    this.store.dispatch(UserActions.logout());
  }
}
