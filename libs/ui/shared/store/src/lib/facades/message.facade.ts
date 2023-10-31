import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { messageFeature } from '../features';
import { showMessage } from '../actions';
import { Message } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class MessageFacade {
  private readonly store = inject(Store);

  /* State */
  message$ = this.store.select(messageFeature.selectMessage);

  showMessage(message: Message) {
    this.store.dispatch(showMessage({ message }));
  }
}
