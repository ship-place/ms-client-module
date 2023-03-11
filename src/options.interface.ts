import { Pattern } from './pattern.interface';

export interface MsClientOptions {
  patterns: Pattern;
  timeout: number;
  service_name: string;
  consumer_name: string;
  kafka_url: string;
}

export const defaultMsClientOptions: MsClientOptions = {
  patterns: { ping: 'service.ping' },
  timeout: 5000,
  service_name: 'service',
  consumer_name: 'consumer',
  kafka_url: 'localhost:9092',
};
