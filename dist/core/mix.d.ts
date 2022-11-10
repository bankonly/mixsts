import { Application } from "express";
export default class MixServer {
    constructor();
    run(callback?: any): void;
    private listener;
    app(): Application;
}
