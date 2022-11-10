import { NextFunction, Request, RequestHandler, Response } from "express";
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
}
export declare enum Method {
    Get = "Get",
    Post = "Post",
    Put = "Put",
    Delete = "Delete"
}
export interface ContextOption {
    apply?: RequestHandler[];
}
