import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions';
import { StateLoadingStatus } from '@soflux/ui/shared/domain';

interface UserState {
  currentUser: User;
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
      currentUser
    }))
  ),
});
