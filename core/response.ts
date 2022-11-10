import { Response } from "express"
import { io } from "./socket"

interface ApiResponseMethod {
    json(arg: any): void
    setCookie(key: string, value: any): ApiResponse
    setHeader(key: string, value: any): ApiResponse
    status(statusCode: number): ApiResponse
    emit(data: any): ApiResponse
}

export default class ApiResponse implements ApiResponseMethod {
    emitUrl?: string
    res: Response
    constructor(res: Response, emitUrl?: string) {
        this.emitUrl = emitUrl
        this.res = res
    }
    json(arg: any): void {
        this.res.json(arg)
    }
    setCookie(key: string, value: any): ApiResponse {
        this.res.setHeader(key, value)
        return this
    }
    setHeader(key: string, value: any): ApiResponse {
        this.res.set(key, value)
        return this
    }
    status(statusCode: number): ApiResponse {
        this.res.status(statusCode)
        return this
    }
    emit(data: any): ApiResponse {
        io.emit(this.emitUrl ?? "", data)
        return this
    }
}
