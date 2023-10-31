import { Component } from '@angular/core';
import { PageComponent } from '@soflux/ui/shared/components';
import { AccountSetupContainerComponent } from '../containers/account-setup-container.component';

@Component({
  standalone: true,
  selector: 'soflux-unassigned-dashboard-page',
  imports: [PageComponent, AccountSetupContainerComponent],
  template: ` <soflux-page><soflux-account-setup-container /></soflux-page>`,
})
export class AccountSetupPageComponent {}
