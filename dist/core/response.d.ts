import { Response } from "express";
interface ApiResponseMethod {
    json(arg: any): void;
    setCookie(key: string, value: any): ApiResponse;
    setHeader(key: string, value: any): ApiResponse;
    status(statusCode: number): ApiResponse;
}
export default class ApiResponse implements ApiResponseMethod {
    res: Response;
    constructor(res: Response);
    json(arg: any): void;
    setCookie(key: string, value: any): ApiResponse;
    setHeader(key: string, value: any): ApiResponse;
    status(statusCode: number): ApiResponse;
}
export {};
