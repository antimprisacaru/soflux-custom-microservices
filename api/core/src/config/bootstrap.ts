import { DateTime } from 'luxon';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from '../app/app.module';
import fastifyCors from '@fastify/cors';
import { fastifyHelmet } from '@fastify/helmet';
import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';
import { appConfig } from '@soflux/api/shared/config';

export async function bootstrap() {
  const startedAt = DateTime.now();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      bodyLimit: 1048576,
    }),
    { bufferLogs: true, abortOnError: false }
  );

  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     forbidNonWhitelisted: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   })
  // );

  // Fastify config
  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
    crossOriginEmbedderPolicy: false,
  });
  app.register(fastifySecureSession, {
    secret: 'averylogphrasebiggerthanthirtytwochars',
    salt: 'mq9hDxBVDbspDR6n',
    cookie: {
      path: '/',
      httpOnly: true,
    },
  });
  app.register(fastifyPassport.initialize());
  app.register(fastifyPassport.secureSession());
  if (!appConfig.origins.length) {
    app.register(fastifyCors, {
      origin: '*',
      // allowedHeaders: ALLOWED_HEADERS,
      // exposedHeaders: EXPOSED_HEADERS,
      allowedHeaders: '*',
      exposedHeaders: '*',
    });
  }

  // await app.register(fastifyRateLimiter, {
  //   max: 100,
  //   timeWindow: '1 minute',
  // });
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(appConfig.core.port, '0.0.0.0', () => {
    logger.info(
      `Server booted in ${DateTime.now().diff(startedAt, 'milliseconds')} ms. Listening on port ${appConfig.core.port}`,
      { context: 'NestApplication' }
    );
  });

  return app;
}
