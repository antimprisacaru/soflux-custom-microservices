import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@soflux/api/shared/services';
import { User } from '@soflux/api/shared/domain';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'averylogphrasebiggerthanthirtytwochars',
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate({ iat, exp, id }: Record<string, number>): Promise<User> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UnauthorizedException(`There isn't any user with ID ${id}`);
    }

    return user;
  }
}
