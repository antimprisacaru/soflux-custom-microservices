import { Routes } from '@angular/router';
import { AccountSetupPageComponent } from './pages/account-setup-page.component';
import { RoleSelectionComponent } from './components/role-selection/role-selection.component';
import { FinalizationComponent } from './components/finalization/finalization.component';
import { DetailsComponent } from './components/details/details.component';

export const setupRouting: Routes = [
  {
    path: '',
    component: AccountSetupPageComponent,
    children: [
      {
        path: 'role',
        component: RoleSelectionComponent,
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
      {
        path: 'finalization',
        component: FinalizationComponent,
      },
      {
        path: '',
        redirectTo: 'role',
        pathMatch: 'full'
      }
    ],
  },
];
