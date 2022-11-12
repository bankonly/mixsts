"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCoreConfig = exports.coreConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load .env
// define function to set core config variable
function setCoreConfig(config) {
    exports.coreConfig = config;
}
exports.setCoreConfig = setCoreConfig;
