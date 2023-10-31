import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UserActions } from '../actions';
import { Role, StateLoadingStatus, User } from '@soflux/ui/shared/domain';

interface UserState {
  currentUser: User | null;
  status: StateLoadingStatus;
}

const initialState: UserState = {
  currentUser: null,
  status: StateLoadingStatus.INIT,
};

export const userFeature = createFeature({
  name: 'Users',
  reducer: createReducer(
    initialState,
    on(UserActions.loadCurrentUser, (state) => ({
      ...state,
      status: StateLoadingStatus.LOADING,
    })),
    on(UserActions.loadCurrentUserSuccess, (state, { currentUser }) => ({
      ...state,
      status: StateLoadingStatus.LOADED,
      currentUser,
    })),
    on(UserActions.logout, (state) => ({
      ...state,
      status: StateLoadingStatus.INIT,
      currentUser: null,
    }))
  ),
  extraSelectors: ({ selectStatus, selectCurrentUser }) => ({
    loading: createSelector(
      selectStatus,
      (status) => status === StateLoadingStatus.LOADING
    ),
    loaded: createSelector(
      selectStatus,
      (status) => status === StateLoadingStatus.LOADED
    ),
    currentUserRole: createSelector(
      selectCurrentUser,
      (currentUser) => currentUser?.role as Role
    ),
  }),
});
