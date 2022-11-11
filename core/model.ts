import mongoose, { Model, Schema, SchemaDefinition, SchemaOptions, } from "mongoose"

export function Entity(collection: string) {
    return function(constructor: any) {
        const model = new constructor()
        const schema = new Schema(model.schema)
        constructor.instance = mongoose.model(collection, schema)
    }
}
export interface ModelSchema extends SchemaDefinition { }
export interface Instance<T = any> extends Model<T> { }
export interface ModelOption extends SchemaOptions { }
export interface ModelInterface {
    schema: ModelSchema
    options?: ModelOption
}
export default class ExtendedModel {
    register(instance: any): Instance {
        const prototype: any = instance.prototype
        const extended = prototype.instance
        const model: Instance = extended
        return model
    }
}

