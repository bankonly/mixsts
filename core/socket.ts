import { Server } from "socket.io";
import { display } from "./common";
import { SocketConfig, SocketContext } from "./options";

export let io: Server
export let socketIo: any
export let socketConfig: SocketConfig
export let socketMiddlewares: any = []
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

// event middleware run first
export function OnEventMiddleware(position: number) {
    return function(target: any, key: string) {
        socketMiddlewares.push({
            position: position,
            callback: function() {
                io = io.use(async (socket: any, next: any) => {
                    try {
                        await target[key](socket, next)
                    } catch (error) {
                        next(error)
                    }
                })
            }
        })
    }
}

async function onConnectionCacther(socket: any, handler: any) {
    try {
        await handler(socket)
    } catch (error) {
        await socket.disconnect()
        console.log(error)
    }
}

export function OnConnection(opts?: SocketContext) {
    return function(target: any, key: string) {
        socketGroups.push({
            channel: SocketChannel.Connection,
            callback: function() {
                io.use(opts?.apply).on("connection", (socket) => onConnectionCacther(socket, target[key]))
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


export function OnEventError() {
    return function(target: any, key: string) {
        socketGroups.push({
            channel: SocketChannel.Event,
            callback: function() {
                io.on("connection", (socket) => socket.on("error", (error) => onEventCatcher(socket, error, target[key])))
            }
        })
    }
}

export default class SocketServer {
    constructor() {
        // register socket middleware
        socketMiddlewares = socketMiddlewares.sort((a: any, b: any) => a.position - b.position)
        for (let i = 0; i < socketMiddlewares.length; i++) {
            const socket = socketMiddlewares[i];
            socket.callback()
        }
        let countConnection = 0
        for (let i = 0; i < socketGroups.length; i++) {
            const socket = socketGroups[i];
            if (countConnection > 1) throw new Error("OnConnection can be call only once")
            if (socket.channel === SocketChannel.Connection) countConnection++
            socket.callback() // intial listener
        }
    }
}
