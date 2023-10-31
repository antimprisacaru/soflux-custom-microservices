import { NestFactory } from '@nestjs/core';
import { Microservices } from './interfaces';
import { getConfig } from './config';
import { MicroServiceConfig } from './interfaces';

export async function bootstrap(module: unknown, microservice: Microservices) {
  const serviceConfig = getConfig<MicroServiceConfig>(microservice);
  const app = await NestFactory.createMicroservice(module, serviceConfig);
  app
    .listen()
    .then(
      () =>
        `Microservice ${microservice} started at ${serviceConfig.options.host}:${serviceConfig.options.port}...`
    );
}
