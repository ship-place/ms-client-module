import { DynamicModule } from '@nestjs/common';
import { MsClientOptions } from './options.interface';
export declare class MsClientModule {
    static forRoot(options: Partial<MsClientOptions>): DynamicModule;
}
