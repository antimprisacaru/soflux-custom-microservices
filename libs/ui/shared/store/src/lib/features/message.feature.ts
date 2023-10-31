import { createFeature, createReducer, on } from '@ngrx/store';
import { showMessage } from '../actions';
import { Message } from 'primeng/api';

interface State {
  message: Message | null;
}

const initialState: State = {
  message: null,
};

export const messageFeature = createFeature({
  name: 'Error',
  reducer: createReducer(
    initialState,
    on(showMessage, (_, { message }): State => ({ message }))
  ),
});
