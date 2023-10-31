import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../enums';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  role: Role;
}
