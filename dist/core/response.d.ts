import { Response } from "express";
interface ApiResponseMethod {
    json(arg: any): void;
    setCookie(key: string, value: any): ApiResponse;
    setHeader(key: string, value: any): ApiResponse;
    status(statusCode: number): ApiResponse;
    emit(data: any): ApiResponse;
}
export default class ApiResponse implements ApiResponseMethod {
    emitUrl?: string;
    res: Response;
    constructor(res: Response, emitUrl?: string);
    json(arg: any): void;
    setCookie(key: string, value: any): ApiResponse;
    setHeader(key: string, value: any): ApiResponse;
    status(statusCode: number): ApiResponse;
    emit(data: any): ApiResponse;
}
export {};
