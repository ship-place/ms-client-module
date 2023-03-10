import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { defaultMsClientOptions, MsClientOptions } from './@types/options.interface';
import { MsClientService } from './ms-client.service';

@Module({})
export class MsClientModule {
  static forRoot(options: Partial<MsClientOptions>): DynamicModule {
    options = Object.assign({}, defaultMsClientOptions, options);
    const client_name = `${options.consumer_name}-${options.service_name}`;
    return {
      imports: [
        ClientsModule.register([
          {
            name: 'CLIENT',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: `${client_name}-client`,
                brokers: [options.kafka_url],
              },
              consumer: {
                groupId: `${client_name}-consumer`,
              },
            },
          },
        ]),
      ],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        MsClientService,
      ],
      exports: [MsClientService],
      module: MsClientModule,
    };
  }
}
