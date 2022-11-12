"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@mix/config");
const options_1 = require("@mix/options");
const controllers_1 = __importDefault(require("@configs/controllers"));
const events_1 = __importDefault(require("./events"));
const models_1 = __importDefault(require("./models"));
// Load all configuration here
(0, config_1.setCoreConfig)({
    port: 1999,
    // express fileupload config
    bindFormData: true,
    // use middlewares
    uses: [
    // example: cors() ---> from cors packages
    ],
    // enable socket event
    socket: {
        transports: ["websocket"],
        enableConnectionLog: true,
        events: events_1.default
    },
    // Enable request log from client
    enableRequestLog: {
        // display original error from Error constructor
        // ex: { message:"...",detail:"detail error" }
        detail: true
    },
    /* Load Controller globally */
    controllerConfig: controllers_1.default,
    /* Load Model globally */
    modelConfig: models_1.default,
    // Database configuration with driver support only mongodb now
    database: {
        driver: options_1.DatabaseDriver.MongoDB,
        host: "mongodb+srv://bank:Bank211998Tsc_@cluster0.ih5kz.mongodb.net/terena_core?retryWrites=true&w=majority",
        // Uncomment to add mongo db connection option
        // connectionOption: {}
    },
    // S3 instance
    awsConfig: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretKeyId: process.env.AWS_SECRET_KEY_ID
    }
});
