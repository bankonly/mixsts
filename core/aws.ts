import AWS from "aws-sdk"
import { v4 as uuid } from "uuid"
import sharp from "sharp"
import { AwsConfig } from "./options";
import { BadRequest } from "./errors";

export let AwsS3: AWS.S3
export function setAwsConfig(config: AwsConfig) {
    AwsS3 = new AWS.S3({
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
export const uploadFile = async (opts: UploadFileOption): Promise<string> => {
    try {
        let filenameOnly = opts.name || uuid() + Date.now()

        let format = opts.format ?? opts.file.mimetype.split("/")[1]

        filenameOnly = filenameOnly + "." + format

        if (opts.originalFilename === true) {
            filenameOnly = opts.file.name
        }

        const fileName = opts.path + filenameOnly

        // Setting up S3 upload parameters
        const option = {
            Bucket: opts.bucket,
            Key: fileName,
            Body: opts.file.data,
        };

        // Uploading files to the bucket
        AwsS3.upload(option).promise();

        if (filenameOnly) return filenameOnly
        return fileName;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
export interface UploadOption {
    file: any
    bucket: string
    name?: string
    format?: string
    originalFilename?: boolean
    path: string
    resize?: number[]
    finish?: boolean
}
export const uploadMany = async (opts: UploadOption) => {
    try {
        if (!Array.isArray(opts.file) || opts.file.length < 1) throw new BadRequest(`Multiple file required`)
        let result = []
        for (let i = 0; i < opts.file.length; i++) {
            const _file = opts.file[i];
            const filename = await upload({ file: _file, bucket: opts.bucket, format: opts.format, path: opts.path, resize: opts.resize, finish: opts.finish })
            result.push(filename)
        }
        return result
    } catch (error: any) {
        throw error
    }
}
export const upload = async (opts: UploadOption) => {
    try {

        if (Array.isArray(opts.file) && opts.file.length > 1) throw new BadRequest(`Multiple file not yet support`)

        let filenameOnly = opts.name || uuid() + Date.now()
        let format = opts.format ?? opts.file.mimetype.split("/")[1]

        filenameOnly = filenameOnly + "." + format

        if (opts.originalFilename === true) {
            filenameOnly = opts.file.name
        }
        const fileName = opts.path + filenameOnly

        // Setting up S3 upload parameters
        const option = {
            Bucket: opts.bucket,
            Key: fileName,
            Body: opts.file.data,
        };

        if (opts.finish === true) await AwsS3.upload(option).promise();
        else AwsS3.upload(option).promise();

        if (Array.isArray(opts.resize)) {
            for (let i = 0; i < opts.resize.length; i++) {
                const element = opts.resize[i];
                const image_resized = await sharp(opts.file.data)
                    .resize(element, element, {
                        fit: sharp.fit.inside,
                        withoutEnlargement: true,
                    })
                    .toBuffer()

                const resize_path = opts.path + element + "x" + element + "/" + filenameOnly
                const resize_option = {
                    Bucket: opts.bucket,
                    Key: resize_path,
                    Body: image_resized,
                };
                AwsS3.upload(resize_option).promise();
            }
        }

        return filenameOnly;
    } catch (error: any) {
        throw error
    }
};

