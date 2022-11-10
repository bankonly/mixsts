"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const common_1 = require("./common");
const options_1 = require("./options");
class ContextRouter {
    constructor() {
        var _a, _b, _c, _d;
        for (let i = 0; i < app_1.groups.length; i++) {
            const ctx = app_1.groups[i];
            let prefix = (_a = ctx.target.prefix) !== null && _a !== void 0 ? _a : "";
            let conOpts = ctx.target.opts;
            let controllerMiddlewares = (_b = conOpts === null || conOpts === void 0 ? void 0 : conOpts.apply) !== null && _b !== void 0 ? _b : [];
            // controller options
            let path = (_c = ctx.path) !== null && _c !== void 0 ? _c : "";
            let handler = ctx.handler;
            let handlerOpts = ctx.opts;
            let handleMiddleware = (_d = handlerOpts === null || handlerOpts === void 0 ? void 0 : handlerOpts.apply) !== null && _d !== void 0 ? _d : [];
            prefix = prefix + path;
            switch (ctx.method) {
                case options_1.Method.Get:
                    app_1.router.get(prefix, controllerMiddlewares, handleMiddleware, (0, common_1.catcher)(handler));
                    break;
                case options_1.Method.Post:
                    app_1.router.post(prefix, controllerMiddlewares, handleMiddleware, (0, common_1.catcher)(handler));
                    break;
                case options_1.Method.Put:
                    app_1.router.put(prefix, controllerMiddlewares, handleMiddleware, (0, common_1.catcher)(handler));
                    break;
                case options_1.Method.Delete:
                    app_1.router.delete(prefix, controllerMiddlewares, handleMiddleware, (0, common_1.catcher)(handler));
                    break;
                default: throw new Error("Invalid methods");
            }
        }
    }
    register() {
        return app_1.router;
    }
}
exports.default = ContextRouter;
