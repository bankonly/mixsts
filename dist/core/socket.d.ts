import { Server } from "socket.io";
import { SocketConfig, SocketContext } from "./options";
export declare let io: Server;
export declare let socketIo: any;
export declare let socketConfig: SocketConfig;
export declare let socketMiddlewares: any;
export declare let socketGroups: any;
export declare function loadEvent(config: SocketConfig): void;
export declare function useSocket(server: any, config: any): void;
export declare function OnEventMiddleware(position: number): (target: any, key: string) => void;
export declare function OnConnection(opts?: SocketContext): (target: any, key: string) => void;
export declare function OnEvent(path: string): (target: any, key: string) => void;
export declare function OnDisconnect(): (target: any, key: string) => void;
export declare function OnEventError(): (target: any, key: string) => void;
export default class SocketServer {
    constructor();
}
