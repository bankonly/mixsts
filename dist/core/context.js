"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Controller = void 0;
const app_1 = require("./app");
const options_1 = require("./options");
// controller decorator define path and option
function Controller(path, opts) {
    return function (constructor) {
        constructor.prototype.prefix = "/" + path;
        constructor.prototype.opts = opts;
    };
}
exports.Controller = Controller;
// store group of router handler from controllers
function context(method, target, key, path, opts) {
    app_1.groups.push({
        method: method,
        handler: target[key],
        opts: opts,
        target: target,
        path: path
    });
}
// define get decorator
function Get(path, opts) {
    return (target, key) => context(options_1.Method.Get, target, key, path, opts);
}
exports.Get = Get;
