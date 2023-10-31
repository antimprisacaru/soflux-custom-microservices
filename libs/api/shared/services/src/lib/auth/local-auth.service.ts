import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@soflux/api/shared/services';
import { JwtResponseBody, User } from '@soflux/api/shared/domain';
import { DateTime } from 'luxon';

@Injectable()
export class LocalAuthService {
  private readonly expiration: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.expiration =
      this.configService.get<number>('WEBTOKEN_EXPIRATION_TIME') || 3200;
  }

  async createToken({ id, role }: User): Promise<JwtResponseBody> {
    return {
      expiration: this.expiration,
      expirationFormatted: DateTime.now()
        .plus({ seconds: this.expiration })
        .toFormat('LLL'),
      token: this.jwtService.sign(
        {
          id,
          role,
        },
        { secret: this.configService.get('WEBTOKEN_ENCRYPTION_KEY') }
      ),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    if (password !== 'example') {
      throw new UnauthorizedException('Password is invalid!');
    }
    return user;
  }
}
