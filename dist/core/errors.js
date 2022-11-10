"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.BadRequest = exports.CustomError = exports.recovery = void 0;
function recovery(error, _, res, next) {
    var _a, _b, _c;
    if (!error)
        return next(); // if there is no error
    // handler error
    let statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    let errorMessage = (_c = (_b = error.msg) !== null && _b !== void 0 ? _b : error.message) !== null && _c !== void 0 ? _c : "Internal server error";
    res.status(statusCode).json({ message: errorMessage });
}
exports.recovery = recovery;
class CustomError extends Error {
    constructor(opts) {
        var _a, _b;
        super();
        this.statusCode = (_a = opts === null || opts === void 0 ? void 0 : opts.statusCode) !== null && _a !== void 0 ? _a : 500;
        this.msg = (_b = opts === null || opts === void 0 ? void 0 : opts.message) !== null && _b !== void 0 ? _b : "Interal server error";
    }
}
exports.CustomError = CustomError;
class BadRequest extends Error {
    constructor(opts) {
        var _a;
        super();
        this.statusCode = 400;
        this.msg = (_a = opts === null || opts === void 0 ? void 0 : opts.message) !== null && _a !== void 0 ? _a : "Bad request";
    }
}
exports.BadRequest = BadRequest;
class Unauthorized extends Error {
    constructor(opts) {
        var _a;
        super();
        this.statusCode = 401;
        this.msg = (_a = opts === null || opts === void 0 ? void 0 : opts.message) !== null && _a !== void 0 ? _a : "Unauthorized";
    }
}
exports.Unauthorized = Unauthorized;
