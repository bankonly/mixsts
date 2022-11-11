import { Model, SchemaDefinition, SchemaOptions } from "mongoose";
export declare function Entity(collection: string): (constructor: any) => void;
export interface ModelSchema extends SchemaDefinition {
}
export interface Instance<T = any> extends Model<T> {
}
export interface ModelOption extends SchemaOptions {
}
export interface ModelInterface {
    schema: ModelSchema;
    options?: ModelOption;
}
export default class ExtendedModel {
    register(instance: any): Instance;
}
