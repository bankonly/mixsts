import { NextFunction, Request, RequestHandler, Response } from "express"
import { ConnectOptions } from "mongoose"
import ApiResponse from "./response"

export interface Context<Body = any, Query = any, Headers = any, Params = any> {
    body: Body
    query: Query
    headers: Headers
    params: Params
    req: Request
    res: Response
    next: NextFunction
    response: ApiResponse
    json: any
    emit: ((data: any) => ApiResponse)
}

export enum Method {
    Get = "Get",
    Post = "Post",
    Put = "Put",
    Delete = "Delete"
}

// interface controller and handle option
export interface ContextOption {
    apply?: RequestHandler[]
    ioEmit?: string
}

export interface SocketConfig {
    require: NodeRequire[]
}
// Socket configuration
export interface SocketOption {
    transports?: string[]
    enableConnectionLog?: boolean
    onCallback?: ((socket: any) => void)
    events?: SocketConfig
}

export interface CatcherOption {
    emitUrl?: string
}

export interface SocketContext {
    path?: string
    apply: any
}

export enum DatabaseDriver {
    MongoDB = "mongodb"
}

export interface DatabaseConfig {
    driver: DatabaseDriver
    host: string
    connectionOption?: ConnectOptions
}

