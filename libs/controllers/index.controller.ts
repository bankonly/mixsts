import { Controller, Get } from "@mix/context";
import { Context } from "@mix/options"
import UserModel from "@models/users.model";

@Controller("index")
export default class IndexController {
    constructor(private user = UserModel.query) { }
    @Get("/")
    async index(context: Context): Promise<void> {
        const result = await this.user.select("email").exec(context.req)
        context.json(result)
    }
}

