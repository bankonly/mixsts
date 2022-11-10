import { Router } from "express";
import { groups, router } from "./app";
import { catcher } from "./common";
import { CatcherOption, ContextOption, Method } from "./options";

export default class ContextRouter {
    constructor() {
        for (let i = 0; i < groups.length; i++) {
            const ctx: any = groups[i];

            let prefix: string = ctx.target.prefix ?? ""
            let conOpts: ContextOption = ctx.target.opts
            let controllerMiddlewares = conOpts?.apply ?? []

            // controller options
            let path = ctx.path ?? ""
            let handler: Function = ctx.handler
            let handlerOpts: ContextOption = ctx.opts
            let handleMiddleware = handlerOpts?.apply ?? []

            prefix = prefix + path

            let catcheOpts: CatcherOption = {
                emitUrl: handlerOpts?.ioEmit
            }

            switch (ctx.method) {
                case Method.Get: router.get(prefix, controllerMiddlewares, handleMiddleware, catcher(handler, catcheOpts)); break
                case Method.Post: router.post(prefix, controllerMiddlewares, handleMiddleware, catcher(handler, catcheOpts)); break
                case Method.Put: router.put(prefix, controllerMiddlewares, handleMiddleware, catcher(handler, catcheOpts)); break
                case Method.Delete: router.delete(prefix, controllerMiddlewares, handleMiddleware, catcher(handler, catcheOpts)); break
                default: throw new Error("Invalid methods")
            }
        }
    }
    register(): Router {
        return router
    }
}

