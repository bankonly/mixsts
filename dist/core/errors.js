"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.BadRequest = exports.CustomError = exports.recovery = void 0;
const config_1 = require("./config");
function recovery(error, _, res, next) {
    var _a, _b, _c, _d;
    if (!error)
        return next(); // if there is no error
    // handler error
    let statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    let errorMessage = (_b = error.msg) !== null && _b !== void 0 ? _b : "Internal server error";
    let detail = (_c = error.message) !== null && _c !== void 0 ? _c : undefined;
    if (!((_d = config_1.coreConfig.enableRequestLog) === null || _d === void 0 ? void 0 : _d.detail)) {
        detail = undefined;
    }
    res.status(statusCode).json({ message: errorMessage, detail });
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
    constructor(message) {
        super();
        this.statusCode = 400;
        this.msg = message !== null && message !== void 0 ? message : "Bad request";
    }
}
exports.BadRequest = BadRequest;
class Unauthorized extends Error {
    constructor(message) {
        super();
        this.statusCode = 401;
        this.msg = message !== null && message !== void 0 ? message : "Unauthorized";
    }
}
exports.Unauthorized = Unauthorized;
