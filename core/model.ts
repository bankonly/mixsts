import mongoose, { Model, Schema, SchemaDefinition, SchemaOptions, } from "mongoose"
import Query from "./query"
export function Entity(collection: string) {
    return function(constructor: any) {
        const model = new constructor()
        const schema = new Schema(model.schema)
        constructor.instance = mongoose.model(collection, schema)
        constructor.query = Query.model(collection)
    }
}
export interface ModelConfig { require: NodeRequire[] }
export let modelConfig: ModelConfig
export function loadModel(config: ModelConfig) {
    modelConfig = config
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

