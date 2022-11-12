import ExtendedModel, { Instance, ModelInterface, ModelOption, ModelSchema } from "@mix/model";
import { AggregateOption } from "@mix/query";
export default class UserModel extends ExtendedModel implements ModelInterface {
    static instance: Instance;
    static query: AggregateOption;
    schema: ModelSchema;
    options?: ModelOption;
}
