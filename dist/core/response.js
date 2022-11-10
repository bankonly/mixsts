"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(res) {
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
}
exports.default = ApiResponse;
