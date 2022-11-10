import { NextFunction, Request, RequestHandler, Response } from "express"
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

// Socket configuration
export interface SocketOption {
    transports?: string[]
    enableConnectionLog?: boolean
    onCallback?: ((socket: any) => void)
}

export interface CatcherOption {
    emitUrl?: string
}
