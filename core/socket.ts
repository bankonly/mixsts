import { Server } from "socket.io";
import { display } from "./common";
import { SocketConfig } from "./options";

export let io: Server
export let socketIo: any
export let socketConfig: SocketConfig
export let socketGroups: any = []
enum SocketChannel {
    Connection = "connection",
    Event = "event"
}
export function loadEvent(config: SocketConfig) {
    socketConfig = config
}

export function useSocket(server: any, config: any): void {
    io = new Server(server, config);
    display("Socket: Started") // log message
}

async function onConnectionCacther(socket: any, handler: any) {
    try {
        await handler(socket)
    } catch (error) {
        await socket.disconnect()
        console.log(error)
    }
}

export function OnConnection() {
    return function(target: any, key: string) {
        socketGroups.push({
            channel: SocketChannel.Connection,
            callback: function() {
                io.on("connection", (socket) => onConnectionCacther(socket, target[key]))
            }
        })
    }
}

async function onEventCatcher(socket: any, payload: any, handler: any): Promise<void> {
    try {
        await handler(payload, socket)
    } catch (error) {
        console.log(error)
    }
}

export function OnEvent(path: string) {
    return function(target: any, key: string) {
        socketGroups.push({
            channel: SocketChannel.Event,
            callback: function() {
                io.on("connection", (socket) => socket.on(path, (payload) => onEventCatcher(socket, payload, target[key])))
            }
        })
    }
}

export function OnDisconnect() {
    return function(target: any, key: string) {
        socketGroups.push({
            channel: SocketChannel.Event,
            callback: function() {
                io.on("connection", (socket) => socket.on("disconnect", () => onConnectionCacther(socket, target[key])))
            }
        })
    }
}

export default class SocketServer {
    constructor() {
        let countConnection = 0
        for (let i = 0; i < socketGroups.length; i++) {
            const socket = socketGroups[i];
            if (countConnection > 1) throw new Error("OnConnection can be call only once")
            if (socket.channel === SocketChannel.Connection) countConnection++
            socket.callback() // intial listener
        }
    }
}
