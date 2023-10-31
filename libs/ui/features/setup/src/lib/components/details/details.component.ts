import { Component } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { AccountLinkingComponent } from '../account-linking/account-linking.component';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'soflux-smart-role-selection',
  imports: [
    NgSwitch,
    AccountLinkingComponent,
    NgSwitchCase,
    CompanyProfileComponent,
    ButtonModule,
    RouterLink,
  ],
  template: `
    <div class="flex flex-column align-items-center justify-content-center">
      <ng-container [ngSwitch]="page">
        <soflux-account-linking *ngSwitchCase="'influencer'" />
        <soflux-company-profile *ngSwitchCase="'company'" />
      </ng-container>
    </div>
    <div class="flex flex-row justify-content-between mt-8">
      <p-button routerLink="/app/setup/role">Previous</p-button>
      <p-button routerLink="/app/setup/finalization">Next</p-button>
    </div>
  `,
})
export class DetailsComponent {
  protected readonly page: 'influencer' | 'company' = 'influencer';
}
