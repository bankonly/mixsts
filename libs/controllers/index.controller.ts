import { Controller, Get } from "@mix/context";
import { Context } from "@mix/options"

@Controller("index")
export default class IndexController {
    @Get("/", { ioEmit: "index" })
    async index(context: Context): Promise<void> {
        context.emit("When enable ioEmit in decorator")
        context.json("kkkSimeple response")
    }
}

