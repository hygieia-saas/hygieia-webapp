import { HttpRequest } from '@aws-sdk/protocol-http';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { parseUrl } from '@aws-sdk/url-parser';
import { Hash } from '@aws-sdk/hash-node';
import { formatUrl } from '@aws-sdk/util-format-url';
import { v1 as uuidv1 } from 'uuid';

export const getPresignedUrlForAnonymousUpload = async (): Promise<string> => {
    const s3ObjectUrl = parseUrl(`https://${process.env.ANONYMOUSUPLOADS_BUCKET_DOMAIN_NAME}/${uuidv1()}`);
    const presigner = new S3RequestPresigner({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            sessionToken: process.env.AWS_SESSION_TOKEN as string
        },
        region: process.env.ANONYMOUSUPLOADS_BUCKET_REGION as string,
        sha256: Hash.bind(null, 'sha256')
    });

    // https://medium.com/@aidan.hallett/securing-aws-s3-uploads-using-presigned-urls-aa821c13ae8d
    // https://stackoverflow.com/questions/13390343/s3-direct-upload-restricting-file-size-and-type
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html
    // https://stackoverflow.com/questions/36783108/amazon-s3-presigned-url-invalidate-manually-or-one-time-upload

    const url = await presigner.presign(
        new HttpRequest({...s3ObjectUrl, method: 'PUT'}),
        { expiresIn: 300 }
    );

    console.debug('PRESIGNED URL: ', formatUrl(url));

    return formatUrl(url);
};
