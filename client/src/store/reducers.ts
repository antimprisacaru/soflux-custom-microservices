import { ActionReducerMap } from '@ngrx/store';
import { userFeature } from '@soflux/ui/shared/store';

class Store {}

export default {
  [userFeature.name]: userFeature.reducer,
} as ActionReducerMap<Store>;
