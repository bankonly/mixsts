import { setCoreConfig } from "@mix/config"
import controllerConfig from "@configs/controllers";
import { onConnection } from "libs/events/socket";

// Load all configuration here
setCoreConfig({
    port: 1999,
    socket: {
        transports: ["websocket"],
        enableConnectionLog: true,
        onCallback: onConnection
    },
    enableRequestLog: true,
    controllerConfig: controllerConfig
})
