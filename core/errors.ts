import { NextFunction, Request, Response } from "express";

export function recovery(error: any, _: Request, res: Response, next: NextFunction): void {
    if (!error) return next() // if there is no error

    // handler error
    let statusCode: number = error.statusCode ?? 500
    let errorMessage: string = error.msg ?? error.message ?? "Internal server error"

    res.status(statusCode).json({ message: errorMessage })
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
    constructor(opts?: ErrorOption) {
        super()
        this.statusCode = 400
        this.msg = opts?.message ?? "Bad request"
    }
}
export class Unauthorized extends Error {
    statusCode: number
    msg: string
    constructor(opts?: ErrorOption) {
        super()
        this.statusCode = 401
        this.msg = opts?.message ?? "Unauthorized"
    }
}
