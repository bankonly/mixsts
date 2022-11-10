"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
class ApiResponse {
    constructor(res, emitUrl) {
        this.emitUrl = emitUrl;
        this.res = res;
    }
    json(arg) {
        this.res.json(arg);
    }
    setCookie(key, value) {
        this.res.setHeader(key, value);
        return this;
    }
    setHeader(key, value) {
        this.res.set(key, value);
        return this;
    }
    status(statusCode) {
        this.res.status(statusCode);
        return this;
    }
    emit(data) {
        var _a;
        socket_1.io.emit((_a = this.emitUrl) !== null && _a !== void 0 ? _a : "", data);
        return this;
    }
}
exports.default = ApiResponse;
