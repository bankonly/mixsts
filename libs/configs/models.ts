import { loadModel, modelConfig } from "@mix/model";

loadModel({
    require: [
        require("@models/users.model")
    ]
})

export default modelConfig
