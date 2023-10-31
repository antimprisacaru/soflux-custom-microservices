import { Component } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'soflux-account-setup-container',
  template: `
    <div class="relative">
      <p-steps [model]="steps" [readonly]="true"></p-steps>
      <div class="mt-8">
        <router-outlet />
      </div>
    </div>
  `,
  imports: [StepsModule, RouterOutlet, ButtonModule],
})
export class AccountSetupContainerComponent {
  protected readonly steps: MenuItem[] = [
    {
      label: 'Choosing your Role',
      icon: '',
      routerLink: 'role',
      // color: '#FF9800',
    },
    {
      label: 'Completing your details',
      icon: 'pi pi-cog',
      routerLink: 'details',
      // color: '#673AB7',
    },
    {
      label: 'Wrapping up',
      icon: 'pi pi-check',
      routerLink: 'finalization',
      // color: '#607D8B',
    },
  ];
}
