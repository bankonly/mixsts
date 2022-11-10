import { controllerConfig, loadController } from "@mix/controller";

loadController({
    require: [
        require("@controllers/index.controller")
    ]
})

export default controllerConfig
