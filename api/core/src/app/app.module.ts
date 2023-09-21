import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { OgmaInterceptor, OgmaModule } from '@ogma/nestjs-module';
import { FastifyParser } from '@ogma/platform-fastify';
import { GraphQLFastifyParser } from '@ogma/platform-graphql-fastify';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import config from '../config';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OgmaModuleOptions } from '@ogma/nestjs-module/src/interfaces';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    OgmaModule.forRoot({
      service: {
        color: true,
        json: false,
        application: 'Soflux Core',
      },
      interceptor: {
        http: FastifyParser,
        ws: false,
        gql: GraphQLFastifyParser,
        rpc: false,
      },
    } as OgmaModuleOptions),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      subscription: true,
      context: (request: unknown, reply: unknown) => ({ request, reply }),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
  ],
  controllers: [],
  providers: [
    AppResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
  ],
})
export class AppModule {}
