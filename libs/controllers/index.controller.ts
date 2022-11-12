import { Controller, Get, Post } from "@mix/context";
import { Context } from "@mix/options"
import UserModel from "@models/users.model";

@Controller("index")
export default class IndexController {
    @Get("/")
    async index(context: Context): Promise<void> {
        const result = await UserModel.query.select("email").exec(context.req)
        context.json(result)
    }
}

