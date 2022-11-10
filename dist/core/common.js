"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catcher = void 0;
const response_1 = __importDefault(require("./response"));
function catcher(handler) {
    return function (req, res, next) {
        const context = {
            body: req.body,
            query: req.query,
            headers: req.headers,
            params: req.params,
            req, res, next,
            response: new response_1.default(res),
            json: (arg) => res.json(arg)
        };
        return Promise.resolve(handler(context)).catch(next);
    };
}
exports.catcher = catcher;
