import { Mongoose } from "mongoose";
export declare class Query {
    lookupList: Array<any>;
    project: any;
    associateKeys: Array<any>;
    pipeline: Array<any>;
    originSelect: Array<any>;
    originExclude: Array<any>;
    excludeSelect: Array<any>;
    searchFields: Array<string>;
    dateField: string;
    paginate: boolean;
    performPaginateBeforeLogic: boolean;
    mongoose: Mongoose;
    option: any;
    constructor(_mongoose: Mongoose);
    model(modelInstance: any): AggregateOption;
}
declare const _default: Query;
export default _default;
export declare class AggregateOption extends Query {
    modelInstance: any;
    mongooseInstance: any;
    constructor(modelInstance: any, mongooseInstance: any);
    lookup({ from, localField, foreignField, as, many, skipNullRecord, select, unset, sum, count }: any): AggregateOption;
    _refModelName(path: string): any;
    populate(dynamicPopulate: any, _select: any): this;
    set(field: string): this;
    setSearchField(...searchFields: any): this;
    _nextPopulate(dynamicPopulates: any, mainPath: any, thirdPath?: any): this;
    match(condition: any): this;
    custom(pipeline: any): this;
    forcePaginate(value: boolean): this;
    select(select: any): this;
    unset(select: any): this;
    setOption({ performPaginateBeforeLogic, dateField }: {
        performPaginateBeforeLogic?: boolean | undefined;
        dateField?: string | undefined;
    }): this;
    exec(req: any): Promise<any>;
}
