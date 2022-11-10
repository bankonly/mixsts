"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
class MixServer {
    constructor() {
        // enableRequestLog from client request
        if (config_1.coreConfig.enableRequestLog === true) {
            app_1.app.use((0, morgan_1.default)("dev"));
        }
        // default cors from useDefaultCors
        if (config_1.coreConfig.useDefaultCors === true) {
            app_1.app.use((0, cors_1.default)());
        }
        // router mapping
        const contextRouter = new router_1.default();
        app_1.app.use(contextRouter.register()); // register controller router from decorators
    }
    run(callback) {
        const fn = callback !== null && callback !== void 0 ? callback : this.listener;
        app_1.app.listen(config_1.coreConfig.port, fn);
    }
    listener() {
        console.log("Mix's server is started!");
        console.log("Port:", config_1.coreConfig.port);
    }
    // export default express application
    app() {
        return app_1.app;
    }
}
exports.default = MixServer;
