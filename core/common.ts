import { NextFunction, Response } from "express";
import { CatcherOption, Context } from "./options";
import ApiResponse from "./response";

export function catcher(handler: Function, opts?: CatcherOption): any {
    return function(req: any, res: Response, next: NextFunction) {
        const response = new ApiResponse(res, opts?.emitUrl)
        const context: Context = {
            body: req.body,
            query: req.query,
            headers: req.headers,
            params: req.params,
            req, res, next,
            response: response,
            files: req.files,
            json: (arg: any) => res.json(arg),
            emit: (arg: any) => response.emit(arg)
        }
        return Promise.resolve(handler(context)).catch(next)
    }
}

export function display(...arg: any): void {
    console.log(...arg)
}
