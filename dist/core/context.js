"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Controller = void 0;
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
function Post(path, opts) {
    return (target, key) => context(options_1.Method.Post, target, key, path, opts);
}
exports.Post = Post;
function Put(path, opts) {
    return (target, key) => context(options_1.Method.Put, target, key, path, opts);
}
exports.Put = Put;
function Delete(path, opts) {
    return (target, key) => context(options_1.Method.Delete, target, key, path, opts);
}
exports.Delete = Delete;
