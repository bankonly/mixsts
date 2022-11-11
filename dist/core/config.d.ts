import { RequestHandler } from "express";
import { ControllerConfig } from "./controller";
import { DatabaseConfig, SocketOption } from "./options";
interface EnableRequestLogOpts {
    detail?: boolean;
}
export interface CoreConfig {
    port: number;
    enableRequestLog?: EnableRequestLogOpts;
    socket?: SocketOption;
    useDefaultCors?: boolean;
    controllerConfig: ControllerConfig;
    database?: DatabaseConfig;
    uses?: RequestHandler[];
}
export declare let coreConfig: CoreConfig;
export declare function setCoreConfig(config: CoreConfig): void;
export {};
