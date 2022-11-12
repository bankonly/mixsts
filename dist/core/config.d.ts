import { RequestHandler } from "express";
import { ControllerConfig } from "./controller";
import { ModelConfig } from "./model";
import { AwsConfig, DatabaseConfig, SocketOption } from "./options";
interface EnableRequestLogOpts {
    detail?: boolean;
}
export interface CoreConfig {
    port: number;
    bindFormData?: boolean;
    enableRequestLog?: EnableRequestLogOpts;
    socket?: SocketOption;
    useDefaultCors?: boolean;
    controllerConfig: ControllerConfig;
    modelConfig?: ModelConfig;
    database?: DatabaseConfig;
    uses?: RequestHandler[];
    awsConfig?: AwsConfig;
}
export declare let coreConfig: CoreConfig;
export declare function setCoreConfig(config: CoreConfig): void;
export {};
