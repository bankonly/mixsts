export default class Event {
    onConnection(socket: any): Promise<void>;
    disconnect(socket: any): Promise<void>;
    chat(payload: any, socket: any): Promise<void>;
    message(payload: any, socket: any): Promise<void>;
}
