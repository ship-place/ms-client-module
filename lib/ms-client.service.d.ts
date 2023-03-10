import { ClientKafka } from '@nestjs/microservices';
import { IMsMessage } from '@ship-place/reqresex';
import { MsClientOptions } from './@types/options.interface';
export declare class MsClientService {
    private readonly options;
    private readonly client;
    constructor(options: MsClientOptions, client: ClientKafka);
    onModuleInit(): Promise<void>;
    send(pattern: keyof typeof this.options.patterns, message?: IMsMessage<any>): Promise<any>;
}
