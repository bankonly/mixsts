import { app } from "./app";
import { coreConfig } from "./config";
import morgan from "morgan"
import { Application } from "express";
import ContextRouter from "./router";
import cors from "cors"
import SocketServer, { useSocket } from "./socket";
import { recovery } from "./errors";
import DBConnection, { setDatabaseConfig } from "./database";
import { setAwsConfig } from "./aws";
import fileUpload from "express-fileupload";

export default class MixServer {
    constructor() {
        // check database connection
        if (coreConfig?.database?.host) {
            setDatabaseConfig(coreConfig.database)
            const db = new DBConnection()
            db.connect()
        }
        // express fileupload
        if (coreConfig.bindFormData === true) app.use(fileUpload())

        // enableRequestLog from client request
        if (coreConfig.enableRequestLog) {
            app.use(morgan("dev"))
        }

        // detect aws
        if (coreConfig.awsConfig) {
            setAwsConfig(coreConfig.awsConfig)
        }

        // default cors from useDefaultCors
        if (coreConfig.useDefaultCors === true) {
            app.use(cors())
        }

        if (coreConfig?.uses && coreConfig.uses.length > 0) {
            app.use(coreConfig?.uses ?? [])
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
