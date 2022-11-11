import _mongoose, { Mongoose } from "mongoose"
import { display } from "./common"
import { DatabaseConfig } from "./options"

export let mongoose: Mongoose = _mongoose
export let databaseConfig: DatabaseConfig

export function setDatabaseConfig(config: DatabaseConfig) {
    databaseConfig = config
}

export default class DBConnection {
    constructor() {
        display("Database: waiting..., Driver:", databaseConfig.driver)
    }
    async connect(): Promise<void> {
        try {
            await mongoose.connect(databaseConfig.host, databaseConfig?.connectionOption)
            display("Database: Connected")
        } catch (error: any) {
            throw new Error(error)
        }
    }
}
