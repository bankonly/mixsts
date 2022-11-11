import ExtendedModel, { Instance, ModelInterface, ModelOption, ModelSchema } from "@mix/model";
export default class UserModel extends ExtendedModel implements ModelInterface {
    static instance: Instance;
    schema: ModelSchema;
    options?: ModelOption;
}
