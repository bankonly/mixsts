"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@mix/config");
const controllers_1 = __importDefault(require("@configs/controllers"));
// Load all configuration here
(0, config_1.setCoreConfig)({
    port: 1999,
    enableRequestLog: true,
    controllerConfig: controllers_1.default
});
