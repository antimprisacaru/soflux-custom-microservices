import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputUserRegistration {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
