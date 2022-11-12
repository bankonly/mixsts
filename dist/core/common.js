"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = exports.catcher = void 0;
const response_1 = __importDefault(require("./response"));
function catcher(handler, opts) {
    return function (req, res, next) {
        const response = new response_1.default(res, opts === null || opts === void 0 ? void 0 : opts.emitUrl);
        const context = {
            body: req.body,
            query: req.query,
            headers: req.headers,
            params: req.params,
            req, res, next,
            response: response,
            files: req.files,
            json: (arg) => res.json(arg),
            emit: (arg) => response.emit(arg)
        };
        return Promise.resolve(handler(context)).catch(next);
    };
}
exports.catcher = catcher;
function display(...arg) {
    console.log(...arg);
}
exports.display = display;
