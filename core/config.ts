import { RequestHandler } from "express"
import { ControllerConfig } from "./controller"
import { DatabaseConfig, SocketOption } from "./options"

interface EnableRequestLogOpts {
    detail?: boolean
}

// core configuration inside application
export interface CoreConfig {
    port: number
    enableRequestLog?: EnableRequestLogOpts
    socket?: SocketOption
    useDefaultCors?: boolean
    controllerConfig: ControllerConfig
    database?: DatabaseConfig
    uses?: RequestHandler[]

}

// global config variable
export let coreConfig: CoreConfig

// define function to set core config variable
export function setCoreConfig(config: CoreConfig) {
    coreConfig = config
}
