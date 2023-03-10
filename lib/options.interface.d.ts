import { Pattern } from '@ship-place/types/backend';
export interface MsClientOptions {
    patterns: Pattern;
    timeout: number;
    service_name: string;
    consumer_name: string;
    kafka_url: string;
}
export declare const defaultMsClientOptions: MsClientOptions;
