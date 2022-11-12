"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = __importStar(require("./socket"));
const errors_1 = require("./errors");
const database_1 = __importStar(require("./database"));
const aws_1 = require("./aws");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class MixServer {
    constructor() {
        var _a, _b;
        // check database connection
        if ((_a = config_1.coreConfig === null || config_1.coreConfig === void 0 ? void 0 : config_1.coreConfig.database) === null || _a === void 0 ? void 0 : _a.host) {
            (0, database_1.setDatabaseConfig)(config_1.coreConfig.database);
            const db = new database_1.default();
            db.connect();
        }
        // express fileupload
        if (config_1.coreConfig.bindFormData === true)
            app_1.app.use((0, express_fileupload_1.default)());
        // enableRequestLog from client request
        if (config_1.coreConfig.enableRequestLog) {
            app_1.app.use((0, morgan_1.default)("dev"));
        }
        // detect aws
        if (config_1.coreConfig.awsConfig) {
            (0, aws_1.setAwsConfig)(config_1.coreConfig.awsConfig);
        }
        // default cors from useDefaultCors
        if (config_1.coreConfig.useDefaultCors === true) {
            app_1.app.use((0, cors_1.default)());
        }
        if ((config_1.coreConfig === null || config_1.coreConfig === void 0 ? void 0 : config_1.coreConfig.uses) && config_1.coreConfig.uses.length > 0) {
            app_1.app.use((_b = config_1.coreConfig === null || config_1.coreConfig === void 0 ? void 0 : config_1.coreConfig.uses) !== null && _b !== void 0 ? _b : []);
        }
        // router mapping
        const contextRouter = new router_1.default();
        app_1.app.use(contextRouter.register()); // register controller router from decorators
        // register error handlers
        app_1.app.use(errors_1.recovery);
    }
    run(callback) {
        const fn = callback !== null && callback !== void 0 ? callback : this.listener;
        const server = app_1.app.listen(config_1.coreConfig.port, fn);
        // start socket server
        if (config_1.coreConfig.socket) {
            (0, socket_1.useSocket)(server, config_1.coreConfig.socket);
            // initial socket
            new socket_1.default();
        }
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
