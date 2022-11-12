"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMongoUUIDToObjectId = exports.initOption = exports.validateField = exports.isObjectId = void 0;
const bson_1 = require("bson");
const isObjectId = (value) => value.toString().match(/^[0-9a-fA-F]{24}$/);
exports.isObjectId = isObjectId;
const validateField = (namespace) => (...field) => {
    for (let i = 0; i < field.length; i++) {
        if (field[i] === null || field[i] === undefined || field[i] === "") {
            throw new Error("Invalid argument inside: " + namespace);
        }
    }
};
exports.validateField = validateField;
const initOption = (option, defaultValue) => (Object.assign(Object.assign({}, defaultValue), option));
exports.initOption = initOption;
const convertMongoUUIDToObjectId = (object) => {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
        if (typeof value !== "object" && (0, exports.isObjectId)(value)) {
            object[key] = new bson_1.ObjectID(value);
        }
        else if (typeof value === "object" && !Array.isArray(value)) {
            const objectKeys = Object.keys(value);
            for (let j = 0; j < objectKeys.length; j++) {
                const objectKey = objectKeys[j];
                const objectValue = value[objectKey];
                if ((0, exports.isObjectId)(objectValue)) {
                    object[key][objectKey] = new bson_1.ObjectID(objectValue);
                }
            }
        }
        else if (Array.isArray(value)) {
            for (let k = 0; k < value.length; k++) {
                const arrayValue = value[k];
                const arrayObjectKeys = Object.keys(arrayValue);
                for (let j = 0; j < arrayObjectKeys.length; j++) {
                    const arrayObjectKey = arrayObjectKeys[j];
                    const arrayObjectValue = arrayValue[arrayObjectKey];
                    if ((0, exports.isObjectId)(arrayObjectValue)) {
                        object[key][k][arrayObjectKey] = new bson_1.ObjectID(arrayObjectValue);
                    }
                }
            }
        }
    }
    return object;
};
exports.convertMongoUUIDToObjectId = convertMongoUUIDToObjectId;
