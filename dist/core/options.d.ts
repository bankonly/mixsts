/// <reference types="node" />
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ConnectOptions } from "mongoose";
import ApiResponse from "./response";
export interface Context<Body = any, Query = any, Headers = any, Params = any> {
    body: Body;
    query: Query;
    headers: Headers;
    params: Params;
    req: Request;
    res: Response;
    next: NextFunction;
    response: ApiResponse;
    json: any;
    files: any;
    emit: ((data: any) => ApiResponse);
}
export declare enum Method {
    Get = "Get",
    Post = "Post",
    Put = "Put",
    Delete = "Delete"
}
export interface ContextOption {
    apply?: RequestHandler[];
    ioEmit?: string;
}
export interface SocketConfig {
    require: NodeRequire[];
}
export interface SocketOption {
    transports?: string[];
    enableConnectionLog?: boolean;
    onCallback?: ((socket: any) => void);
    events?: SocketConfig;
}
export interface CatcherOption {
    emitUrl?: string;
}
export interface SocketContext {
    path?: string;
    apply: any;
}
export declare enum DatabaseDriver {
    MongoDB = "mongodb"
}
export interface DatabaseConfig {
    driver: DatabaseDriver;
    host: string;
    connectionOption?: ConnectOptions;
}
export interface AwsConfig {
    accessKeyId?: string;
    secretKeyId?: string;
}
