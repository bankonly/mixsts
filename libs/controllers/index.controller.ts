import { Controller, Get } from "@mix/context";
import { Context } from "@mix/options"

@Controller("index")
export default class IndexController {
    @Get("/", { ioEmit: "index" })
    async index(context: Context): Promise<void> {
        context.emit("datatat")
        context.json("index controller")
    }
}

