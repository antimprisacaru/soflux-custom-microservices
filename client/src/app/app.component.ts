import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageFacade } from '@soflux/ui/shared/store';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

@Component({
  standalone: true,
  imports: [RouterModule, ToastModule, MessagesModule],
  selector: 'soflux-root',
  template: `
    <p-toast position="top-right"></p-toast>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(
    private messageFacade: MessageFacade,
    private messageService: MessageService,
  ) {
    this.messageFacade.message$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (message) =>
          message && setTimeout(() => this.messageService.add(message))
      );
  }
}
