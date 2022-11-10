"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnDisconnect = exports.OnEvent = exports.OnConnection = exports.useSocket = exports.loadEvent = exports.socketGroups = exports.socketConfig = exports.socketIo = exports.io = void 0;
const socket_io_1 = require("socket.io");
const common_1 = require("./common");
exports.socketGroups = [];
var SocketChannel;
(function (SocketChannel) {
    SocketChannel["Connection"] = "connection";
    SocketChannel["Event"] = "event";
})(SocketChannel || (SocketChannel = {}));
function loadEvent(config) {
    exports.socketConfig = config;
}
exports.loadEvent = loadEvent;
function useSocket(server, config) {
    exports.io = new socket_io_1.Server(server, config);
    (0, common_1.display)("Socket: Started"); // log message
}
exports.useSocket = useSocket;
function onConnectionCacther(socket, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield handler(socket);
        }
        catch (error) {
            yield socket.disconnect();
            console.log(error);
        }
    });
}
function OnConnection() {
    return function (target, key) {
        exports.socketGroups.push({
            channel: SocketChannel.Connection,
            callback: function () {
                exports.io.on("connection", (socket) => onConnectionCacther(socket, target[key]));
            }
        });
    };
}
exports.OnConnection = OnConnection;
function onEventCatcher(socket, payload, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield handler(payload, socket);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function OnEvent(path) {
    return function (target, key) {
        exports.socketGroups.push({
            channel: SocketChannel.Event,
            callback: function () {
                exports.io.on("connection", (socket) => socket.on(path, (payload) => onEventCatcher(socket, payload, target[key])));
            }
        });
    };
}
exports.OnEvent = OnEvent;
function OnDisconnect() {
    return function (target, key) {
        exports.socketGroups.push({
            channel: SocketChannel.Event,
            callback: function () {
                exports.io.on("connection", (socket) => socket.on("disconnect", () => onConnectionCacther(socket, target[key])));
            }
        });
    };
}
exports.OnDisconnect = OnDisconnect;
class SocketServer {
    constructor() {
        let countConnection = 0;
        for (let i = 0; i < exports.socketGroups.length; i++) {
            const socket = exports.socketGroups[i];
            if (countConnection > 1)
                throw new Error("OnConnection can be call only once");
            if (socket.channel === SocketChannel.Connection)
                countConnection++;
            socket.callback(); // intial listener
        }
    }
}
exports.default = SocketServer;
