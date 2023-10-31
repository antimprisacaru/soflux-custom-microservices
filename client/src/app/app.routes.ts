import { Route } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { isSignedInGuard, notSignedInGuard } from '@soflux/ui/shared/routing';
import { isRoleAssignedGuard } from '../../../libs/ui/shared/routing/src/lib/guards/is-role-assigned.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [notSignedInGuard],
    loadComponent: () =>
      import('@soflux/ui/features/landing').then((f) => f.LandingPageComponent),
    title: 'Landing Page',
  },
  {
    path: 'login',
    canActivate: [notSignedInGuard],
    loadComponent: () =>
      import('@soflux/ui/features/user').then((f) => f.LoginPageComponent),
    title: 'Login Page',
  },
  {
    path: 'register',
    canActivate: [notSignedInGuard],
    loadComponent: () =>
      import('@soflux/ui/features/user').then((f) => f.RegisterPageComponent),
    title: 'Register Page',
  },
  {
    path: 'app',
    component: CoreComponent,
    canActivate: [isSignedInGuard, ],
    children: [
      {
        path: '',
        canActivate: [isRoleAssignedGuard],
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('@soflux/ui/features/dashboard').then(
                (r) => r.dashboardRouting
              ),
            title: 'Dashboard Page',
          },
          {
            path: 'browse',
            loadChildren: () =>
              import('@soflux/ui/features/browsing').then((r) => r.browsingRouting),
            title: 'Browse Page',
          },
        ]
      },
      {
        path: 'setup',
        loadChildren: () => import('@soflux/ui/features/setup').then(r => r.setupRouting),
        title: 'Setup Page'
      }
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Not Found',
  },
  {
    path: '',
    redirectTo: '/app/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
