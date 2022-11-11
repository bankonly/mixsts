import { OnConnection, OnDisconnect, OnEvent, OnEventError } from "@mix/socket";
import { Socket } from "socket.io";

export default class Event {
    @OnConnection()
    async onConnection(socket: any): Promise<void> {
        const socketId = socket.id // socket id
        socket.context = socket.handshake.auth
        console.log("connected:", socketId)
    }

    // @OnEventMiddleware(1)
    // async auth(socket: Socket, next: any): Promise<void> {
    //     next()
    // }


    @OnEventError()
    async onError(error: any, socket: Socket): Promise<void> {
        console.log(socket.id)
        console.log("error: ", error.message)
    }

    @OnDisconnect()
    async disconnect(socket: any): Promise<void> {
        console.log("Disconnected:", socket.id)
    }

    @OnEvent("chat")
    async chat(payload: any, socket: any): Promise<void> {
        console.log(payload)
        console.log(socket.id)
        // your logic here
    }

    @OnEvent("message")
    async message(payload: any, socket: any): Promise<void> {
        console.log(payload)
        console.log(socket.id)

        // your logic here
    }
}

