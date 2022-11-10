"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("@mix/controller");
(0, controller_1.loadController)({
    require: [
        require("@controllers/index.controller")
    ]
});
exports.default = controller_1.controllerConfig;
