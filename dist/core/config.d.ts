import { ControllerConfig } from "./controller";
interface SocketOption {
    transports?: string[];
}
export interface CoreConfig {
    port: number;
    enableRequestLog?: boolean;
    socket?: SocketOption;
    useDefaultCors?: boolean;
    controllerConfig: ControllerConfig;
}
export declare let coreConfig: CoreConfig;
export declare function setCoreConfig(config: CoreConfig): void;
export {};
