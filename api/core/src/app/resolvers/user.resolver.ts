import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  InputUserRegistration,
  JwtResponseBody,
  User,
} from '@soflux/api/shared/domain';
import { BearerToken, JwtAuthGuard, Public } from '@soflux/api/shared/auth';
import { AuthService, UserService } from '@soflux/api/shared/services';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OgmaService } from '@ogma/nestjs-module';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtService: JwtService,
    private logger: OgmaService
  ) {}

  @Mutation(() => User)
  @Public()
  register(@Args('input') input: InputUserRegistration): Promise<User> {
    return this.userService.create(input);
  }

  @Mutation(() => JwtResponseBody)
  @Public()
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<JwtResponseBody> {
    const user = await this.authService.validateUser(email, password);
    return this.authService.createToken(user);
  }

  @Query(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  currentUser(@BearerToken() token: string): Promise<User | null> {
    if (!token) {
      return null;
    }
    const decodedUser = this.jwtService.decode(
      token.includes('Bearer ') ? token.split(' ')[1] : token,
      { json: true }
    );

    if (typeof decodedUser === 'string' || !decodedUser) {
      throw Error('Invalid JWT');
    }

    return this.userService.findOne(+decodedUser.id);
  }
}
