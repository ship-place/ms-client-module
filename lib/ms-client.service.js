"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsClientService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const reqresex_1 = require("@ship-place/reqresex");
const rxjs_1 = require("rxjs");
let MsClientService = class MsClientService {
    constructor(options, client) {
        this.options = options;
        this.client = client;
    }
    async onModuleInit() {
        await Promise.all(Object.values(this.options.patterns).map((pattern) => this.client.subscribeToResponseOf(pattern)));
        await this.client.connect();
    }
    async send(pattern, message) {
        const res = (await (0, rxjs_1.lastValueFrom)(this.client.send(pattern, message !== null && message !== void 0 ? message : '').pipe((0, rxjs_1.timeout)(this.options.timeout))));
        if (pattern === this.options.patterns.ping)
            return res;
        if (!res || !res.status)
            throw new reqresex_1.RpcHttpException(`[MS-CLIENT] Something wrong: ${this.options.service_name}`);
        if (res.status !== reqresex_1.MsMessageStatus.SUCCESS)
            throw new reqresex_1.RpcHttpException(res.error || `[MS-CLIENT] Bad response from ${this.options.service_name}`);
        return res.data;
    }
};
MsClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CONFIG_OPTIONS')),
    __param(1, (0, common_1.Inject)('CLIENT')),
    __metadata("design:paramtypes", [Object, microservices_1.ClientKafka])
], MsClientService);
exports.MsClientService = MsClientService;
//# sourceMappingURL=ms-client.service.js.map