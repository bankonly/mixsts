import { setCoreConfig } from "@mix/config"
import { DatabaseDriver } from "@mix/options";
import controllerConfig from "@configs/controllers";
import socketConfig from "./events";
import modelConfig from "./models";

// Load all configuration here
setCoreConfig({
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
        events: socketConfig
    },
    // Enable request log from client
    enableRequestLog: {
        // display original error from Error constructor
        // ex: { message:"...",detail:"detail error" }
        detail: true
    },

    /* Load Controller globally */
    controllerConfig: controllerConfig,

    /* Load Model globally */
    modelConfig: modelConfig,
    // Database configuration with driver support only mongodb now
    database: {
        driver: DatabaseDriver.MongoDB,
        host: process.env.MONGO_URI ?? "",
        // Uncomment to add mongo db connection option
        // connectionOption: {}
    },

    // S3 instance
    awsConfig: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretKeyId: "we"
    }
})
