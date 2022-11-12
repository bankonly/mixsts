import { NextFunction, Request, Response } from "express";
import { coreConfig } from "./config";

export function recovery(error: any, _: Request, res: Response, next: NextFunction): void {
    if (!error) return next() // if there is no error

    // handler error
    let statusCode: number = error.statusCode ?? 500
    let errorMessage: string = error.msg ?? "Internal server error"
    let detail = error.message ?? undefined
    if (!coreConfig.enableRequestLog?.detail) {
        detail = undefined
    }
    console.log(error)
    res.status(statusCode).json({ message: errorMessage, detail })
}

interface ErrorOption {
    statusCode?: number
    message?: string
}

export class CustomError extends Error {
    statusCode: number
    msg: string
    constructor(opts?: ErrorOption) {
        super()
        this.statusCode = opts?.statusCode ?? 500
        this.msg = opts?.message ?? "Interal server error"
    }
}
export class BadRequest extends Error {
    statusCode: number
    msg: string
    constructor(message?: string) {
        super()
        this.statusCode = 400
        this.msg = message ?? "Bad request"
    }
}
export class Unauthorized extends Error {
    statusCode: number
    msg: string
    constructor(message?: string) {
        super()
        this.statusCode = 401
        this.msg = message ?? "Unauthorized"
    }
}
