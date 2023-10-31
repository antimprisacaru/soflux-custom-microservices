import { JwtResponseBody, User } from '@soflux/api/shared/domain';
import { ConfigService } from '@nestjs/config';
import { LocalAuthService } from './local-auth.service';
import { UserService } from '@soflux/api/shared/services';
import { JwtService } from '@nestjs/jwt';

export abstract class AuthService {
  abstract createToken(input: User): Promise<JwtResponseBody>;
  abstract validateUser(email: string, password: string): Promise<User>;
}

export const authServiceFactory = {
  provide: AuthService,
  useFactory: (
    configService: ConfigService,
    userService: UserService,
    jwtService: JwtService
  ) => {
    return new LocalAuthService(configService, userService, jwtService);
  },
  inject: [ConfigService, UserService, JwtService],
};
