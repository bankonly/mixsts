import { ControllerConfig } from "./controller";
import { SocketOption } from "./options";
export interface CoreConfig {
    port: number;
    enableRequestLog?: boolean;
    socket?: SocketOption;
    useDefaultCors?: boolean;
    controllerConfig: ControllerConfig;
}
export declare let coreConfig: CoreConfig;
export declare function setCoreConfig(config: CoreConfig): void;
