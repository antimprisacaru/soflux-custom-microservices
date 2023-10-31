import { Resolver } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Resolver()
export class ConfigResolver {
  constructor(private configService: ConfigService) {
  }
}
