import { ObjectID } from "bson"

export const isObjectId = (value: string) => value.toString().match(/^[0-9a-fA-F]{24}$/)

export const validateField = (namespace: string) => (...field: any) => {
    for (let i = 0; i < field.length; i++) {
        if (field[i] === null || field[i] === undefined || field[i] === "") {
            throw new Error("Invalid argument inside: " + namespace)
        }
    }
}

export const initOption = (option: any, defaultValue: any) => ({ ...defaultValue, ...option })

export const convertMongoUUIDToObjectId = (object: any) => {
    const keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key]
        if (typeof value !== "object" && isObjectId(value)) {
            object[key] = new ObjectID(value)
        }
        else if (typeof value === "object" && !Array.isArray(value)) {
            const objectKeys = Object.keys(value)
            for (let j = 0; j < objectKeys.length; j++) {
                const objectKey = objectKeys[j];
                const objectValue = value[objectKey]
                if (isObjectId(objectValue)) {
                    object[key][objectKey] = new ObjectID(objectValue)
                }
            }
        } else if (Array.isArray(value)) {
            for (let k = 0; k < value.length; k++) {
                const arrayValue = value[k];
                const arrayObjectKeys = Object.keys(arrayValue)
                for (let j = 0; j < arrayObjectKeys.length; j++) {
                    const arrayObjectKey = arrayObjectKeys[j];
                    const arrayObjectValue = arrayValue[arrayObjectKey]
                    if (isObjectId(arrayObjectValue)) {
                        object[key][k][arrayObjectKey] = new ObjectID(arrayObjectValue)
                    }
                }
            }
        }

    }
    return object
}

