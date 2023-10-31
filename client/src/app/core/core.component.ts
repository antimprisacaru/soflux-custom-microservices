import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserFacade } from '@soflux/ui/shared/store';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'soflux-core',
  template: ` <div class="layout-wrapper">
    <soflux-header [user]="userFacade.currentUser$ | async" (logout)="userFacade.logout()"></soflux-header>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-outlet></router-outlet>
      </div>
      <soflux-footer></soflux-footer>
    </div>
    <div class="layout-mask"></div>
  </div>`,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe],
})
export class CoreComponent {
  constructor(protected userFacade: UserFacade) {}
}
