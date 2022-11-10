import { ControllerConfig } from "./controller"
import { SocketOption } from "./options"

// Socket configuration

// core configuration inside application
export interface CoreConfig {
    port: number
    enableRequestLog?: boolean
    socket?: SocketOption
    useDefaultCors?: boolean
    controllerConfig: ControllerConfig
}

// global config variable
export let coreConfig: CoreConfig

// define function to set core config variable
export function setCoreConfig(config: CoreConfig) {
    coreConfig = config
}
