import { config } from "dotenv"
config() // Load .env
import { RequestHandler } from "express"
import { ControllerConfig } from "./controller"
import { ModelConfig } from "./model"
import { AwsConfig, DatabaseConfig, SocketOption } from "./options"

interface EnableRequestLogOpts {
    detail?: boolean
}

// core configuration inside application
export interface CoreConfig {
    port: number
    bindFormData?: boolean
    enableRequestLog?: EnableRequestLogOpts
    socket?: SocketOption
    useDefaultCors?: boolean
    controllerConfig: ControllerConfig
    modelConfig?: ModelConfig
    database?: DatabaseConfig
    uses?: RequestHandler[]
    awsConfig?: AwsConfig
}

// global config variable
export let coreConfig: CoreConfig

// define function to set core config variable
export function setCoreConfig(config: CoreConfig) {
    coreConfig = config
}
