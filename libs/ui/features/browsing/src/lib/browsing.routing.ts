import { Routes } from '@angular/router';
import { userRoleGuard } from '@soflux/ui/shared/routing';
import { Role } from '@soflux/ui/shared/domain';
import { ListCompaniesPageComponent } from './influencers/pages/list-companies-page.component';
import { ListInfluencersPageComponent } from './companies/pages/list-influencers-page.component';

export const browsingRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('@soflux/ui/shared/components').then(c => c.PageComponent),
    children: [
      {
        path: '',
        canMatch: [userRoleGuard([Role.Influencer])],
        component: ListCompaniesPageComponent
      },
      {
        path: '',
        canMatch: [userRoleGuard([Role.Company])],
        component: ListInfluencersPageComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];
