import ExtendedModel, { Entity, Instance, ModelInterface, ModelOption, ModelSchema } from "@mix/model"
import { AggregateOption } from "@mix/query"

@Entity("admins")
export default class UserModel extends ExtendedModel implements ModelInterface {

    /* normally datainstance allow only inside repositories
       uncomment this one to use Model instance globally */
    static instance: Instance
    static query: AggregateOption
    schema: ModelSchema = {
        id: {
            type: String
        }
    }
    options?: ModelOption = {
        timestamps: true,
    }
}

