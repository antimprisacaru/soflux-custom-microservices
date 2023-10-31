import { createAction, props } from '@ngrx/store';
import { Message } from 'primeng/api';

export const showMessage = createAction(
  '[Message] Show!',
  props<{ message: Message }>()
);
