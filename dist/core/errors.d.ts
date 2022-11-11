import { NextFunction, Request, Response } from "express";
export declare function recovery(error: any, _: Request, res: Response, next: NextFunction): void;
interface ErrorOption {
    statusCode?: number;
    message?: string;
}
export declare class CustomError extends Error {
    statusCode: number;
    msg: string;
    constructor(opts?: ErrorOption);
}
export declare class BadRequest extends Error {
    statusCode: number;
    msg: string;
    constructor(message?: string);
}
export declare class Unauthorized extends Error {
    statusCode: number;
    msg: string;
    constructor(message?: string);
}
export {};
