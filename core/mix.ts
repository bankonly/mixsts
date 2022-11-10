import { app } from "./app";
import { coreConfig } from "./config";
import morgan from "morgan"
import { Application } from "express";
import ContextRouter from "./router";
import cors from "cors"
import SocketServer, { useSocket } from "./socket";
import { recovery } from "./errors";

export default class MixServer {
    constructor() {
        // enableRequestLog from client request
        if (coreConfig.enableRequestLog === true) {
            app.use(morgan("dev"))
        }

        // default cors from useDefaultCors
        if (coreConfig.useDefaultCors === true) {
            app.use(cors())
        }

        // router mapping
        const contextRouter: ContextRouter = new ContextRouter()
        app.use(contextRouter.register()) // register controller router from decorators

        // register error handlers
        app.use(recovery)
    }

    run(callback?: any): void {
        const fn = callback ?? this.listener
        const server = app.listen(coreConfig.port, fn)

        // start socket server
        if (coreConfig.socket) {
            useSocket(server, coreConfig.socket)

            // initial socket
            new SocketServer()
        }
    }

    private listener(): void {
        console.log("Mix's server is started!")
        console.log("Port:", coreConfig.port)
    }

    // export default express application
    app(): Application {
        return app
    }
}
