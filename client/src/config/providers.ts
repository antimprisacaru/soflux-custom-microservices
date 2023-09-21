import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { appInitializerFactory } from './app-initializer.factory';

export default [
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: []
  }
] as Array<Provider | EnvironmentProviders>;
