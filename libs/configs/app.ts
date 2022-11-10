import { setCoreConfig } from "@mix/config"
import controllerConfig from "@configs/controllers";
import socketConfig from "./events";

// Load all configuration here
setCoreConfig({
    port: 1999,
    socket: {
        transports: ["websocket"],
        enableConnectionLog: true,
        events: socketConfig
    },
    enableRequestLog: true,
    controllerConfig: controllerConfig
})
