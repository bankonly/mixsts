import AWS from "aws-sdk";
export interface AwsConfig {
    accessKeyId: string;
    secretKeyId: string;
}
export declare let S3Instance: AWS.S3;
export declare function setAwsConfig(config: AwsConfig): void;
export interface UploadFileOption {
    file: any;
    bucket: string;
    format?: string;
    path: string;
    name?: string;
    originalFilename?: boolean;
    outputFilenameOnly?: boolean;
}
