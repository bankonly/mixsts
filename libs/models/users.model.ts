import ExtendedModel, { Entity, Instance, ModelInterface, ModelOption, ModelSchema } from "@mix/model"

@Entity("admins")
export default class UserModel extends ExtendedModel implements ModelInterface {

    /* normally datainstance allow only inside repositories
       uncomment this one to use Model instance globally */
    static instance: Instance

    schema: ModelSchema = {
        id: {
            type: String
        }
    }
    options?: ModelOption = {
        timestamps: true,
    }
}

