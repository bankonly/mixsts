import AWS from "aws-sdk";
import { AwsConfig } from "./options";
export declare let AwsS3: AWS.S3;
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
export declare const uploadFile: (opts: UploadFileOption) => Promise<string>;
export interface UploadOption {
    file: any;
    bucket: string;
    name?: string;
    format?: string;
    originalFilename?: boolean;
    path: string;
    resize?: number[];
    finish?: boolean;
}
export declare const uploadMany: (opts: UploadOption) => Promise<string[]>;
export declare const upload: (opts: UploadOption) => Promise<string>;
