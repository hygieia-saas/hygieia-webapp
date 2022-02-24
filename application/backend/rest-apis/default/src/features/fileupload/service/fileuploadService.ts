import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";

export const getPresignedUrlForAnonymousUpload = async (objectName: string): Promise<string> => {
    const s3ObjectUrl = parseUrl(`https://hygieia-webapp-anonymousuploads-preprod.s3.us-east-1.amazonaws.com/${objectName}`);
    const presigner = new S3RequestPresigner({
        credentials: { accessKeyId: '', secretAccessKey: '' },
        region: 'us-east-1',
        sha256: Hash.bind(null, 'sha256')
    });

    const url = await presigner.presign(new HttpRequest({...s3ObjectUrl, method: 'PUT'}));

    console.log('PRESIGNED URL: ', formatUrl(url));

    return formatUrl(url);
};
