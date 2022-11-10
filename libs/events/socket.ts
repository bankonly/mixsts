import { io, OnConnection, OnDisconnect, OnEvent } from "@mix/socket";

export default class Event {
    @OnConnection()
    async onConnection(socket: any): Promise<void> {
        const socketId = socket.id // socket id
        socket.context = socket.handshake.auth
        console.log("connected:", socketId)
    }

    @OnDisconnect()
    async disconnect(socket: any): Promise<void> {
        console.log("Disconnected:", socket.id)
    }

    @OnEvent("chat")
    async chat(payload: any, socket: any): Promise<void> {
        console.log(payload)
        io.to(socket.id).emit("message", "You're connected")
        // your logic here
    }

    @OnEvent("message")
    async message(payload: any, socket: any): Promise<void> {
        console.log(payload)
        console.log(socket.id)

        // your logic here
    }
}

