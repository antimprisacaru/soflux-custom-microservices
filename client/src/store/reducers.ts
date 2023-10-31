import { ActionReducerMap } from '@ngrx/store';
import { messageFeature, userFeature } from '@soflux/ui/shared/store';
import { RouterState } from '@soflux/ui/shared/common';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

class Store {
  router: RouterReducerState<RouterState>;
}

export default {
  router: routerReducer,
  [userFeature.name]: userFeature.reducer,
  [messageFeature.name]: messageFeature.reducer,
} as ActionReducerMap<Store>;
