import mongoose, { Mongoose } from "mongoose"
import { Request } from "express"
import { initOption, validateField, convertMongoUUIDToObjectId } from "./query.utils"

export class Query {
    lookupList: Array<any>
    project: any
    associateKeys: Array<any>
    pipeline: Array<any>
    originSelect: Array<any>
    originExclude: Array<any>
    excludeSelect: Array<any>
    searchFields: Array<string>
    dateField: string
    paginate: boolean
    performPaginateBeforeLogic: boolean
    mongoose: Mongoose
    option: any
    constructor(_mongoose: Mongoose) {
        this.lookupList = []
        this.project = null
        this.associateKeys = []
        this.pipeline = []
        this.originSelect = []
        this.originExclude = []
        this.excludeSelect = []
        this.searchFields = []
        this.dateField = "created_at"
        this.paginate = false
        this.performPaginateBeforeLogic = false
        this.mongoose = _mongoose
        this.option = {
            lookup: { from: null, field: null, foreignField: null, as: null, many: false, skipNullRecord: true }
        }
    }

    model(modelInstance: any) {
        const func = new AggregateOption(modelInstance, this.mongoose)
        return func
    }
}
export default new Query(mongoose)

const populateDynamic = (associate: any): any => {
    const result: any = { modelName: associate.modelName, path: associate.path, select: associate.select, populate: associate.populate, many: associate.many, unset: associate.unset }
    if (Array.isArray(associate)) return [result]
    return result
}

export class AggregateOption extends Query {
    modelInstance: any
    mongooseInstance: any
    constructor(modelInstance: any, mongooseInstance: any) {
        super(mongooseInstance)
        if (typeof modelInstance !== "string") {
            if (!modelInstance.modelName) throw new Error("Must specific model instance or model name")
            modelInstance = modelInstance.modelName
        }
        this.modelInstance = mongooseInstance.model(modelInstance)
        this.mongooseInstance = mongooseInstance
    }

    lookup({ from, localField, foreignField, as, many = true, skipNullRecord = true, select = null, unset = [], sum = { as: false, field: false }, count = false }: any): AggregateOption {
        this.associateKeys.push(as)

        let option = { from, localField, foreignField, as, many, skipNullRecord, unset }
        option = initOption(option, this.option.lookup)

        // Validate field
        validateField('LOOKUP')(option.from, option.localField, option.foreignField, option.as, option.many, option.skipNullRecord)

        const lookupPipeline: any = [
            { $match: { $expr: { $eq: ["$" + foreignField, "$$fromId"] } }, },
        ]

        if (select && typeof select === "string") {
            const selectSplit = select.split(" ")
            let selectField: any = {}
            for (let i = 0; i < selectSplit.length; i++) selectField[selectSplit[i]] = 1
            lookupPipeline.push({ $project: selectField })
            if (option.unset && Array.isArray(option.unset) && option.unset.length > 0) {
                lookupPipeline.push({ $unset: option.unset })
            }
        }

        this.pipeline.push({
            $lookup: {
                from: from,
                let: { fromId: "$" + localField },
                pipeline: lookupPipeline,
                as: as
            }
        })

        if (!option.many) {
            this.pipeline.push({
                $unwind: { path: "$" + as, preserveNullAndEmptyArrays: option.skipNullRecord },
            })
        }

        // Perform sum and count
        if (sum.field && typeof sum.field === "string") {

            const sumField = typeof sum.as === "string" ? sum.as : `${from}_sum_amount`

            const facetSumField = [
                {
                    $facet: {
                        data: [{ $match: {} }],
                        sumData: [
                            {
                                $group: {
                                    _id: "$items",
                                    value: { $sum: `$items.price` }
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: "$data",
                },
                {
                    $unwind: "$sumData",
                },
                {
                    $addFields: {
                        [`data.${sumField}`]: "$sumData"
                    }
                },
                {
                    $replaceRoot: { newRoot: "$data" },
                },
            ]
            this.pipeline = [...facetSumField, ...this.pipeline]
        }

        return this
    }

    _refModelName(path: string): any {
        let refModel = this.modelInstance.schema.path(path)
        if (!refModel) throw new Error(`Invalid Path: ${path}`)
        refModel = refModel.options
        if (!refModel.ref) throw new Error(`Invalid Reference path: ${path}, Please reference field`)
        return refModel.ref
    }


    populate(dynamicPopulate: any, _select: any) {
        const populateResult: any = populateDynamic(dynamicPopulate)

        if (Array.isArray(dynamicPopulate)) throw new Error('Array populate not support yet')

        const path = populateResult.path || dynamicPopulate
        if (!path) throw new Error('Populate path must be given')

        this.associateKeys.push(path)

        let select = populateResult.select
        let unset = populateResult.select

        if (!populateResult.select) select = _select

        const many = populateResult.many || false
        const populate = populateResult.populate

        const from = this._refModelName(path)
        let option = { from, localField: path, foreignField: "_id", as: path, many, skipNullRecord: true }

        // Validate field
        validateField('LOOKUP')(option.from, option.localField, option.foreignField, option.as, option.many, option.skipNullRecord)

        const lookupPipeline: any = [
            { $match: { $expr: { $eq: ["$" + option.foreignField, "$$fromId"] } }, },
        ]

        if (select && typeof select === "string") {
            const selectSplit = select.split(" ")
            let selectField: any = {}
            for (let i = 0; i < selectSplit.length; i++) selectField[selectSplit[i]] = 1
            lookupPipeline.push({ $project: selectField })
            if (unset && Array.isArray(unset) && unset.length > 0) {
                lookupPipeline.push({ $unset: unset })
            }
        }

        this.pipeline.push({
            $lookup: {
                from: from,
                let: { fromId: "$" + option.localField },
                pipeline: lookupPipeline,
                as: option.as
            }
        })

        if (!option.many) {
            this.pipeline.push({
                $unwind: { path: "$" + option.as, preserveNullAndEmptyArrays: option.skipNullRecord },
            })
        }

        if (populate) this._nextPopulate(populate, path)
        return this
    }

    set(field: string) {
        if (typeof field !== "string") throw new Error("Set's required params as string")
        this.project = field.split(" ")
        return this
    }

    setSearchField(...searchFields: any) {
        this.searchFields = searchFields
        return this
    }

    _nextPopulate(dynamicPopulates: any, mainPath: any, thirdPath?: any) {
        dynamicPopulates = Array.isArray(dynamicPopulates) ? dynamicPopulates : [dynamicPopulates]

        for (let popI = 0; popI < dynamicPopulates.length; popI++) {
            let dynamicPopulate = dynamicPopulates[popI];
            const populateResult: any = populateDynamic(dynamicPopulates[popI])

            if (Array.isArray(dynamicPopulate)) throw new Error('Array populate not support yet')

            let modelName = populateResult.modelName
            let path = populateResult.path || dynamicPopulate

            if (thirdPath) {
                path = thirdPath + "." + mainPath + "." + path
            } else {
                path = mainPath + "." + path
            }

            if (!path) throw new Error('Sub Populate path must be given')
            if (!modelName) throw new Error('Sub Populate modelName must be given')

            this.associateKeys.push(path)

            let select = populateResult.select
            let unset = populateResult.select

            const many = populateResult.many || false
            const populate = populateResult.populate

            const from = modelName
            let option = { from, localField: path, foreignField: "_id", as: path, many, skipNullRecord: true }

            // Validate field
            validateField('LOOKUP')(option.from, option.localField, option.foreignField, option.as, option.many, option.skipNullRecord)

            const lookupPipeline: any = [
                { $match: { $expr: { $eq: ["$" + option.foreignField, "$$fromId"] } }, },
            ]

            if (select && typeof select === "string") {
                const selectSplit = select.split(" ")
                let selectField: any = {}
                for (let i = 0; i < selectSplit.length; i++) selectField[selectSplit[i]] = 1
                lookupPipeline.push({ $project: selectField })
                if (unset && Array.isArray(unset) && unset.length > 0) {
                    lookupPipeline.push({ $unset: unset })
                }
            }

            this.pipeline.push({
                $lookup: {
                    from: from,
                    let: { fromId: "$" + option.localField },
                    pipeline: lookupPipeline,
                    as: option.as
                }
            })

            if (!option.many) {
                this.pipeline.push({
                    $unwind: { path: "$" + option.as, preserveNullAndEmptyArrays: option.skipNullRecord },
                })
            }
            if (populate) this._nextPopulate(populate, modelName, mainPath)
        }

        return this
    }

    match(condition: any) {
        convertMongoUUIDToObjectId(condition)
        this.pipeline.push({ $match: condition })
        return this
    }

    custom(pipeline: any) {
        this.pipeline.push(pipeline)
        return this
    }

    forcePaginate(value: boolean) {
        this.paginate = value
        return this
    }

    select(select: any) {
        if (this.excludeSelect.length > 0) throw new Error('Cannot use select with exclude, Please use only one of them')
        if (!Array.isArray(select)) {
            if (typeof select !== "string") throw new Error('Invalid select value')
            select = select.split(" ")
        }
        this.originSelect = [...select, ...this.associateKeys]
        return this
    }

    unset(select: any) {
        if (this.originSelect.length > 0) throw new Error('Cannot use exclude with select, Please use only one of them')

        if (!Array.isArray(select)) {
            if (typeof select !== "string") throw new Error('Invalid select value')
            select = select.split(" ")
        }
        this.excludeSelect = [...select, ...this.excludeSelect]
        return this
    }

    setOption({ performPaginateBeforeLogic = false, dateField = "created_at" }) {
        this.performPaginateBeforeLogic = performPaginateBeforeLogic
        this.dateField = dateField
        return this
    }


    async exec(req: any) {
        // perform search
        const keyword = req.query.q
        let unsetField: any = []
        if (keyword && this.searchFields.length > 0) {
            let addFields: any = {}
            this.searchFields.map(e => {
                unsetField.push(`q_${e}`)
                addFields[`q_${e}`] = {
                    $toString: "$" + e
                }
            })
            this.pipeline = [...this.pipeline,
            { $addFields: addFields },
            {
                $match: {
                    $or: this.searchFields.map(e => ({
                        [`q_${e}`]: { $regex: keyword, $options: "gi" }
                    }))
                }
            }]
        }

        let project
        if (this.project) project = this.project
        else if (this.originSelect.length > 0) project = this.originSelect

        if (project) {
            let selectField: any = {}
            for (let i = 0; i < project.length; i++) selectField[project[i]] = 1
            this.pipeline = [...this.pipeline, {
                $project: selectField
            }]
        }

        if (this.excludeSelect.length > 0) this.pipeline = [...this.pipeline, { $unset: this.excludeSelect }]

        // perform start date and end date
        if (req.query.start_date && req.query.end_date) {

            let startDate = new Date(req.query.start_date + " 00:00:00")
            let endDate = new Date(req.query.end_date + " 23:59:59")

            if (startDate.toString() === "Invalid Date" || endDate.toString() === "Invalid Date") {
                throw new Error("400::Invalid Start & End date")
            }
            this.pipeline.push({ $match: { [`${this.dateField}`]: { $gte: startDate, $lte: endDate } } })
        }

        let summary: any = req.query.summary
        let total_record = 0
        if (summary === "true") {
            const [_total_record] = await this.modelInstance.aggregate([...this.pipeline, { $count: "total_record" }])
            total_record = _total_record ? _total_record.total_record : 0
        }

        // perform paginate
        let page: any = parseInt(req.query.page) || false
        let limit: any = parseInt(req.query.limit) || false

        if (this.paginate && (!page || limit)) throw new Error("400::Limit & Page must be given")
        if (page && limit) {
            let skip = 0
            if (page > 1) skip = page * limit - limit

            if (this.performPaginateBeforeLogic) {
                this.pipeline = [{ $skip: skip }, { $limit: limit }, ...this.pipeline]
            } else {
                this.pipeline.push({ $skip: skip })
                this.pipeline.push({ $limit: limit })
            }
        }

        // perform sorting
        let sort = req.query.sort
        if (sort) {
            sort = sort.split("|")
            if (sort.length !== 2) throw new Error("Invalid sort parameter")

            const sortKey = sort[0]
            let sortArg = sort[1].toLowerCase()

            if (!["asc", "desc"].includes(sortArg)) throw new Error("Invalid sort parameter for " + sortArg)

            sortArg = sortArg === "asc" ? -1 : 1

            this.pipeline.push({ $sort: { [`${sortKey}`]: sortArg } })
        }


        if (unsetField.length > 0) this.pipeline = [...this.pipeline, { $unset: unsetField }]

        let responseData = await this.modelInstance.aggregate(this.pipeline)

        // perform summary
        if (summary === "true") {
            const total_page = Math.ceil(total_record / limit)
            responseData = {
                total: total_record,
                total_in_page: responseData.length,
                page: page,
                total_page,
                limit: limit,
                next: (responseData.length <= 0 || total_page >= responseData.length) ? null : page + 1,
                previous: page <= 1 ? null : page > total_page + 1 ? null : page - 1,
                data: responseData,
            }
        } else {
            responseData = await this.modelInstance.aggregate(this.pipeline)
        }

        return responseData
    }
}

