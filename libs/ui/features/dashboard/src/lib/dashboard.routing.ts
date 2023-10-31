import { Routes } from '@angular/router';
import { userRoleGuard } from '@soflux/ui/shared/routing';
import { Role } from '@soflux/ui/shared/domain';
import { InfluencerDashboardPageComponent } from './influencer/pages/influencer-dashboard-page.component';
import { CompanyDashboardPageComponent } from './company/pages/company-dashboard-page.component';
import { AdminDashboardPageComponent } from './admin/pages/admin-dashboard-page.component';

export const dashboardRouting: Routes = [
  {
    path: '',
    canMatch: [userRoleGuard([Role.Influencer])],
    component: InfluencerDashboardPageComponent,
  },
  {
    path: '',
    canMatch: [userRoleGuard([Role.Company])],
    component: CompanyDashboardPageComponent,
  },
  {
    path: '',
    canMatch: [userRoleGuard([Role.Admin])],
    component: AdminDashboardPageComponent,
  },
];
