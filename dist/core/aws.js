"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadMany = exports.uploadFile = exports.setAwsConfig = exports.AwsS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
const errors_1 = require("./errors");
function setAwsConfig(config) {
    exports.AwsS3 = new aws_sdk_1.default.S3({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretKeyId
    });
}
exports.setAwsConfig = setAwsConfig;
const uploadFile = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let filenameOnly = opts.name || (0, uuid_1.v4)() + Date.now();
        let format = (_a = opts.format) !== null && _a !== void 0 ? _a : opts.file.mimetype.split("/")[1];
        filenameOnly = filenameOnly + "." + format;
        if (opts.originalFilename === true) {
            filenameOnly = opts.file.name;
        }
        const fileName = opts.path + filenameOnly;
        // Setting up S3 upload parameters
        const option = {
            Bucket: opts.bucket,
            Key: fileName,
            Body: opts.file.data,
        };
        // Uploading files to the bucket
        exports.AwsS3.upload(option).promise();
        if (filenameOnly)
            return filenameOnly;
        return fileName;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.uploadFile = uploadFile;
const uploadMany = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!Array.isArray(opts.file) || opts.file.length < 1)
            throw new errors_1.BadRequest(`Multiple file required`);
        let result = [];
        for (let i = 0; i < opts.file.length; i++) {
            const _file = opts.file[i];
            const filename = yield (0, exports.upload)({ file: _file, bucket: opts.bucket, format: opts.format, path: opts.path, resize: opts.resize, finish: opts.finish });
            result.push(filename);
        }
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.uploadMany = uploadMany;
const upload = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (Array.isArray(opts.file) && opts.file.length > 1)
            throw new errors_1.BadRequest(`Multiple file not yet support`);
        let filenameOnly = opts.name || (0, uuid_1.v4)() + Date.now();
        let format = (_b = opts.format) !== null && _b !== void 0 ? _b : opts.file.mimetype.split("/")[1];
        filenameOnly = filenameOnly + "." + format;
        if (opts.originalFilename === true) {
            filenameOnly = opts.file.name;
        }
        const fileName = opts.path + filenameOnly;
        // Setting up S3 upload parameters
        const option = {
            Bucket: opts.bucket,
            Key: fileName,
            Body: opts.file.data,
        };
        if (opts.finish === true)
            yield exports.AwsS3.upload(option).promise();
        else
            exports.AwsS3.upload(option).promise();
        if (Array.isArray(opts.resize)) {
            for (let i = 0; i < opts.resize.length; i++) {
                const element = opts.resize[i];
                const image_resized = yield (0, sharp_1.default)(opts.file.data)
                    .resize(element, element, {
                    fit: sharp_1.default.fit.inside,
                    withoutEnlargement: true,
                })
                    .toBuffer();
                const resize_path = opts.path + element + "x" + element + "/" + filenameOnly;
                const resize_option = {
                    Bucket: opts.bucket,
                    Key: resize_path,
                    Body: image_resized,
                };
                exports.AwsS3.upload(resize_option).promise();
            }
        }
        return filenameOnly;
    }
    catch (error) {
        throw error;
    }
});
exports.upload = upload;
