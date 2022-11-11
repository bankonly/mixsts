import { Mongoose } from "mongoose";
import { DatabaseConfig } from "./options";
export declare let mongoose: Mongoose;
export declare let databaseConfig: DatabaseConfig;
export declare function setDatabaseConfig(config: DatabaseConfig): void;
export default class DBConnection {
    constructor();
    connect(): Promise<void>;
}
