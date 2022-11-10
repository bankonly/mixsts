"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const socket_1 = require("@mix/socket");
class Event {
    onConnection(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const socketId = socket.id; // socket id
            socket.context = socket.handshake.auth;
            console.log("connected:", socketId);
        });
    }
    disconnect(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Disconnected:", socket.id);
        });
    }
    chat(payload, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(payload);
            socket_1.io.to(socket.id).emit("message", "You're connected");
            // your logic here
        });
    }
    message(payload, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(payload);
            console.log(socket.id);
            // your logic here
        });
    }
}
__decorate([
    (0, socket_1.OnConnection)()
], Event.prototype, "onConnection", null);
__decorate([
    (0, socket_1.OnDisconnect)()
], Event.prototype, "disconnect", null);
__decorate([
    (0, socket_1.OnEvent)("chat")
], Event.prototype, "chat", null);
__decorate([
    (0, socket_1.OnEvent)("message")
], Event.prototype, "message", null);
exports.default = Event;