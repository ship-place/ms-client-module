import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IMsMessage, MsMessageStatus, RpcHttpException } from '@ship-place/reqresex';
import { lastValueFrom, timeout } from 'rxjs';
import { MsClientOptions } from './options.interface';

@Injectable()
export class MsClientService {
  constructor(
    // prettier-ignore
    @Inject('CONFIG_OPTIONS') private readonly options: MsClientOptions,
    @Inject('CLIENT') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await Promise.all(
      Object.values(this.options.patterns).map((pattern) => this.client.subscribeToResponseOf(pattern)),
    );
    await this.client.connect();
  }

  async send(pattern: keyof typeof this.options.patterns, message?: IMsMessage<any>): Promise<any> {
    const res = (await lastValueFrom(
      this.client.send(pattern, message ?? '').pipe(timeout(this.options.timeout)),
    )) as IMsMessage<any>;

    if (pattern === this.options.patterns.ping) return res;

    if (!res || !res.status) throw new RpcHttpException(`[MS-CLIENT] Something wrong: ${this.options.service_name}`);
    if (res.status !== MsMessageStatus.SUCCESS)
      throw new RpcHttpException(res.error || `[MS-CLIENT] Bad response from ${this.options.service_name}`);
    return res;
  }
}
