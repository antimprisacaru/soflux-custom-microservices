import {
  APP_INITIALIZER,
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
} from '@angular/core';
import { appInitializerFactory } from './app-initializer.factory';
import { ApolloModule } from 'apollo-angular';
import { UserService } from '@soflux/ui/shared/services';
import { UserFacade } from '@soflux/ui/shared/store';
import { apolloConfig } from './apollo.config';
import { MessageService } from 'primeng/api';
import { ThemeService } from '@soflux/ui/shared/common';

export default [
  importProvidersFrom(ApolloModule),
  MessageService,
  ThemeService,
  apolloConfig,
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [UserService, UserFacade],
    multi: true,
  },
] as Array<Provider | EnvironmentProviders>;
