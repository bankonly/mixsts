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
exports.setAwsConfig = exports.S3Instance = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
function setAwsConfig(config) {
    exports.S3Instance = new aws_sdk_1.default.S3({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretKeyId
    });
}
exports.setAwsConfig = setAwsConfig;
const uploadFile = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let only_file_name = file_name || (0, uuid_1.v4)() + Date.now() + "." + fileType;
        if (origin_filename) {
            only_file_name = file.name;
        }
        const fileName = path + only_file_name;
        // Setting up S3 upload parameters
        const option = {
            Bucket: bucket,
            Key: fileName,
            Body: file.data,
        };
        // Uploading files to the bucket
        if (complete) {
            yield awsConfig.upload(option).promise();
        }
        else {
            awsConfig.upload(option).promise();
        }
        if (return_only_name)
            return only_file_name;
        return fileName;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const uploadMany = ({ file, bucket = process.env.AWS_S3_BUCKET_NAME, fileType = "jpg", path, resize, complete = false }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!Array.isArray(file) || file.length < 1)
            throw new Error(`400::Multiple file required`);
        let result = [];
        for (let i = 0; i < file.length; i++) {
            const _file = file[i];
            const filename = yield upload({ file: _file, bucket, fileType, path, resize, complete });
            result.push(filename);
        }
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const upload = ({ file, bucket = process.env.AWS_S3_BUCKET_NAME, fileType = "jpg", path, resize, complete = false }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Array.isArray(file) && file.length > 1)
            throw new Error(`400::Multiple file not yet support`);
        const only_file_name = (0, uuid_1.v4)() + Date.now() + "." + fileType;
        const fileName = path + only_file_name;
        // Setting up S3 upload parameters
        const option = {
            Bucket: bucket,
            Key: fileName,
            Body: file.data,
        };
        if (complete) {
            yield awsConfig.upload(option).promise();
        }
        else {
            awsConfig.upload(option).promise();
        }
        if (Array.isArray(resize)) {
            for (let i = 0; i < resize.length; i++) {
                const element = resize[i];
                const image_resized = yield (0, sharp_1.default)(file.data)
                    .resize(element, element, {
                    fit: sharp_1.default.fit.inside,
                    withoutEnlargement: true,
                })
                    .toBuffer();
                const resize_path = path + element + "x" + element + "/" + only_file_name;
                const resize_option = {
                    Bucket: bucket,
                    Key: resize_path,
                    Body: image_resized,
                };
                if (complete) {
                    yield awsConfig.upload(resize_option).promise();
                }
                else {
                    awsConfig.upload(resize_option).promise();
                }
            }
        }
        return only_file_name;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const AwsFunc = {
    uploadFile,
    awsConfig,
    upload,
    uploadMany
};
module.exports = AwsFunc;
