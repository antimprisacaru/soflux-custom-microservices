import { Transport } from '@nestjs/microservices';
import { Microservices } from './applications.map';

export interface MicroServiceConfig {
  name: Microservices;
  options: {
    host: string;
    port: number;
  };
  transport?: Transport;
}
