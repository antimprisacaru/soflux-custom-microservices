import {
  DatabaseConfig,
  MicroServiceConfig,
  Microservices,
} from '../interfaces';
import { Transport } from '@nestjs/microservices';
import { CoreConfig } from '../interfaces';

type AppConfig = { [key in Microservices]: MicroServiceConfig } & {
  core: CoreConfig;
  origins: Array<string>;
  database: DatabaseConfig;
  isProd: boolean;
};

export const appConfig: AppConfig = {
  [Microservices.COLLABORATION]: {
    name: Microservices.COLLABORATION,
    options: {
      host: 'localhost',
      port: 3001,
    },
    transport: Transport.TCP,
  },
  [Microservices.INTEGRATION]: {
    name: Microservices.INTEGRATION,
    options: {
      host: 'localhost',
      port: 3002,
    },
    transport: Transport.TCP,
  },
  [Microservices.MESSAGING]: {
    name: Microservices.MESSAGING,
    options: {
      host: 'localhost',
      port: 3003,
    },
    transport: Transport.TCP,
  },
  [Microservices.PAYMENT]: {
    name: Microservices.PAYMENT,
    options: {
      host: 'localhost',
      port: 3004,
    },
    transport: Transport.TCP,
  },
  [Microservices.REVIEW]: {
    name: Microservices.REVIEW,
    options: {
      host: 'localhost',
      port: 3005,
    },
    transport: Transport.TCP,
  },
  [Microservices.USER]: {
    name: Microservices.USER,
    options: {
      host: 'localhost',
      port: 3006,
    },
    transport: Transport.TCP,
  },
  core: {
    port: 3000,
  },
  origins: [],
  database: {},
  isProd: false
};

export function getConfig<T>(key: keyof AppConfig): T {
  return appConfig[key] as T;
}
