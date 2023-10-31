import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  override canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    switch (context.getType<GqlContextType>()) {
      case 'graphql': {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;
        if (gqlReq) {
          return ctx.getArgs();
        }
        return ctx.getContext().req;
      }
      default: // 'http' | 'ws' | 'rpc'
        return context.switchToHttp().getRequest();
    }
  }
}
