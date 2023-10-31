import { AppModule } from './app/app.module';

import('@soflux/api/shared/config').then((config) =>
  config.bootstrap(AppModule, config.Microservices.INTEGRATION)
);
