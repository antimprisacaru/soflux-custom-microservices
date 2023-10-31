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
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthModule } from '@soflux/api/shared/auth';
import resolvers from './resolvers';
import { authServiceFactory, UserService } from '@soflux/api/shared/services';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    OgmaModule.forRoot({
      color: true,
      json: false,
      application: 'Soflux Core'
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      subscription: true,
      autoSchemaFile: join(process.cwd(), 'api/core/src/config/schema.gql'),
      context: (request: FastifyRequest, reply: FastifyReply) => ({
        request,
        reply,
      }),
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
    // Microservice split will be done at a later time.
    // ClientsModule.register({
    //   clients: Object.values(Microservices).map((service: Microservices) => ({
    //     name: service,
    //     transport: getConfig<MicroServiceConfig>(service).transport
    //   }))
    // })
    /*** Modules ***/
    AuthModule,
  ],
  controllers: [],
  providers: [
    ...resolvers,
    authServiceFactory,
    UserService,
    JwtService,
    FastifyParser,
    GraphQLFastifyParser,
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
  ],
})
export class AppModule {}
