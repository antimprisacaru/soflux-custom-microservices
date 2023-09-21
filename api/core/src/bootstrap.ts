import { DateTime } from 'luxon';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { OgmaService } from '@ogma/nestjs-module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export async function bootstrap() {
  const startedAt = DateTime.now();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true, abortOnError: false }
  );

  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.enableCors({
    origin: true,
    credentials: true
  });

  // await app.register(fastifyRateLimiter, {
  //   max: 100,
  //   timeWindow: '1 minute',
  // });
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  logger.info(`Server booted in ${DateTime.now().diff(startedAt, 'milliseconds')} ms.`, { context: 'NestApplication' });

  await app.listen(process.env.PORT || 3000);

  return app;
}
