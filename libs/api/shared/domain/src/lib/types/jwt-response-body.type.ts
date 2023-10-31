import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtResponseBody {
  @Field(() => Int)
  expiration: number;

  @Field(() => String)
  expirationFormatted: string;

  @Field(() => String)
  token: string;
}
