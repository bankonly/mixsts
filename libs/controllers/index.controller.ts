import { Controller, Get } from "@mix/context";
import { Context } from "@mix/options"
import UserModel from "@models/users.model";

@Controller("index")
export default class IndexController {
    @Get("/", { ioEmit: "index" })
    async index(context: Context): Promise<void> {
        const admins = await UserModel.instance.find()
        context.emit(admins)
        context.json(admins)
    }
}

