import AWS from "aws-sdk"
import { v4 as uuid } from "uuid"
import sharp from "sharp"

export interface AwsConfig {
    accessKeyId: string
    secretKeyId: string
}
export let S3Instance: AWS.S3
export function setAwsConfig(config: AwsConfig) {
    S3Instance = new AWS.S3({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretKeyId
    });
}
export interface UploadFileOption {
    file: any
    bucket: string
    format?: string
    path: string
    name?: string
    originalFilename?: boolean
    outputFilenameOnly?: boolean

}
const uploadFile = async (opts: UploadFileOption) => {
    try {
        let only_file_name = file_name || uuid() + Date.now() + "." + fileType;
        if (origin_filename) {
            only_file_name = file.name
        }

        const fileName = path + only_file_name

        // Setting up S3 upload parameters
        const option = {
            Bucket: bucket,
            Key: fileName,
            Body: file.data,
        };

        // Uploading files to the bucket
        if (complete) {
            await awsConfig.upload(option).promise();
        } else {
            awsConfig.upload(option).promise();
        }

        if (return_only_name) return only_file_name
        return fileName;
    } catch (error) {
        throw new Error(error.message);
    }
};

const uploadMany = async ({ file, bucket = process.env.AWS_S3_BUCKET_NAME, fileType = "jpg", path, resize, complete = false }) => {
    try {
        if (!Array.isArray(file) || file.length < 1) throw new Error(`400::Multiple file required`)
        let result = []
        for (let i = 0; i < file.length; i++) {
            const _file = file[i];
            const filename = await upload({ file: _file, bucket, fileType, path, resize, complete })
            result.push(filename)
        }
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

const upload = async ({ file, bucket = process.env.AWS_S3_BUCKET_NAME, fileType = "jpg", path, resize, complete = false }) => {
    try {

        if (Array.isArray(file) && file.length > 1) throw new Error(`400::Multiple file not yet support`)

        const only_file_name = uuid() + Date.now() + "." + fileType;
        const fileName = path + only_file_name

        // Setting up S3 upload parameters
        const option = {
            Bucket: bucket,
            Key: fileName,
            Body: file.data,
        };
        if (complete) {
            await awsConfig.upload(option).promise();
        } else {
            awsConfig.upload(option).promise();

        }

        if (Array.isArray(resize)) {
            for (let i = 0; i < resize.length; i++) {
                const element = resize[i];
                const image_resized = await sharp(file.data)
                    .resize(element, element, {
                        fit: sharp.fit.inside,
                        withoutEnlargement: true,
                    })
                    .toBuffer()

                const resize_path = path + element + "x" + element + "/" + only_file_name
                const resize_option = {
                    Bucket: bucket,
                    Key: resize_path,
                    Body: image_resized,
                };
                if (complete) {
                    await awsConfig.upload(resize_option).promise();
                } else {
                    awsConfig.upload(resize_option).promise();
                }
            }
        }

        return only_file_name;
    } catch (error) {
        throw new Error(error.message);
    }
};

const AwsFunc = {
    uploadFile,
    awsConfig,
    upload,
    uploadMany
};

module.exports = AwsFunc;
