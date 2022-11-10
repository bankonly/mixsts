import { Server } from "socket.io";
import { display } from "./common";
import { coreConfig } from "./config";

export let io: Server
export let socketIo: any

export function useSocket(server: any, config: any): void {
    io = new Server(server, config);
    display("Socket: Started") // log message
    onConnection() // start connection logic
}

function onConnection() {
    io.on("connection", coreConfig.socket?.onCallback ?? onConnectionListen)
}

// default socket handler
function onConnectionListen(socket: any) {
    socketIo = socket
    if (coreConfig.socket?.enableConnectionLog === true) {
        display("Socket: new connection", socket.id)
    }
    socket.on("disconnect", function() {
        if (coreConfig.socket?.enableConnectionLog === true) {
            display("Socket: disconnect", socket.id)
        }
    })
}

