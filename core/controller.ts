// define config interface
export interface ControllerConfig {
    require: NodeRequire[] // require node controller
}

export let controllerConfig: ControllerConfig // controller config

// create function to set controller config
export function loadController(config: ControllerConfig) {
    controllerConfig = config
}
