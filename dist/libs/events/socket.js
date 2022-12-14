"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const socket_io_1 = require("socket.io");
class Event {
    onConnection(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const socketId = socket.id; // socket id
            socket.context = socket.handshake.auth;
            console.log("connected:", socketId);
        });
    }
    // @OnEventMiddleware(1)
    // async auth(socket: Socket, next: any): Promise<void> {
    //     next()
    // }
    onError(error, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(socket.id);
            console.log("error: ", error.message);
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
            console.log(socket.id);
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
    (0, socket_1.OnConnection)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Event.prototype, "onConnection", null);
__decorate([
    (0, socket_1.OnEventError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], Event.prototype, "onError", null);
__decorate([
    (0, socket_1.OnDisconnect)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Event.prototype, "disconnect", null);
__decorate([
    (0, socket_1.OnEvent)("chat"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Event.prototype, "chat", null);
__decorate([
    (0, socket_1.OnEvent)("message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Event.prototype, "message", null);
exports.default = Event;
