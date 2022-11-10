/// <reference types="node" />
export interface ControllerConfig {
    require: NodeRequire[];
}
export declare let controllerConfig: ControllerConfig;
export declare function loadController(config: ControllerConfig): void;
