"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseDriver = exports.Method = void 0;
var Method;
(function (Method) {
    Method["Get"] = "Get";
    Method["Post"] = "Post";
    Method["Put"] = "Put";
    Method["Delete"] = "Delete";
})(Method = exports.Method || (exports.Method = {}));
var DatabaseDriver;
(function (DatabaseDriver) {
    DatabaseDriver["MongoDB"] = "mongodb";
})(DatabaseDriver = exports.DatabaseDriver || (exports.DatabaseDriver = {}));
