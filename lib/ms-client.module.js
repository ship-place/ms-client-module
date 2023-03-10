"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MsClientModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsClientModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const options_interface_1 = require("./options.interface");
const ms_client_service_1 = require("./ms-client.service");
let MsClientModule = MsClientModule_1 = class MsClientModule {
    static forRoot(options) {
        options = Object.assign({}, options_interface_1.defaultMsClientOptions, options);
        const client_name = `${options.consumer_name}-${options.service_name}`;
        return {
            imports: [
                microservices_1.ClientsModule.register([
                    {
                        name: 'CLIENT',
                        transport: microservices_1.Transport.KAFKA,
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
                ms_client_service_1.MsClientService,
            ],
            exports: [ms_client_service_1.MsClientService],
            module: MsClientModule_1,
        };
    }
};
MsClientModule = MsClientModule_1 = __decorate([
    (0, common_1.Module)({})
], MsClientModule);
exports.MsClientModule = MsClientModule;
//# sourceMappingURL=ms-client.module.js.map