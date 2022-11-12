"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mix/model");
(0, model_1.loadModel)({
    require: [
        require("@models/users.model")
    ]
});
exports.default = model_1.modelConfig;
