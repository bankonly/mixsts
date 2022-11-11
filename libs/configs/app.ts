import { setCoreConfig } from "@mix/config"
import controllerConfig from "@configs/controllers";
import socketConfig from "./events";
import { DatabaseDriver } from "@mix/options";

// Load all configuration here
setCoreConfig({
    port: 1999,

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
    controllerConfig: controllerConfig,

    // Database configuration with driver support only mongodb now
    database: {
        driver: DatabaseDriver.MongoDB,
        host: "mongodb+srv://bank:Bank211998Tsc_@cluster0.ih5kz.mongodb.net/terena_core?retryWrites=true&w=majority",
        // Uncomment to add mongo db connection option
        // connectionOption: {}
    }
})
