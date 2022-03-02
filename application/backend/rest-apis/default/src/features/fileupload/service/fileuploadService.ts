import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';
import { v1 as uuidv1 } from 'uuid';
import { recaptchaResponseKeyIsValid } from '../../../app/util/recaptchaUtils';
import { IPresignedPost } from 'hygieia-webapp-shared';

export const getPresignedPostForAnonymousUpload = async (responseKey: string): Promise<IPresignedPost> => {

    // https://medium.com/@aidan.hallett/securing-aws-s3-uploads-using-presigned-urls-aa821c13ae8d
    // https://stackoverflow.com/questions/13390343/s3-direct-upload-restricting-file-size-and-type
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html
    // https://stackoverflow.com/questions/36783108/amazon-s3-presigned-url-invalidate-manually-or-one-time-upload


    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html

    return new Promise(async (resolve, reject) => {
        const recaptchaWasSolved = await recaptchaResponseKeyIsValid(responseKey);
        if (!recaptchaWasSolved) {
            reject();
        }

        const key = uuidv1();
        const Conditions = [
            { 'key': key },
            { 'bucket': process.env.ANONYMOUSUPLOADS_BUCKET_NAME as string },
            ['content-length-range', 1, 10485760]
        ];

        const client = new S3Client({ region: process.env.ANONYMOUSUPLOADS_BUCKET_REGION as string as string });
        const Bucket = process.env.ANONYMOUSUPLOADS_BUCKET_NAME as string;
        const Key = key;
        const Fields = {
            success_action_status: '201',
        };

        const { url, fields } = await createPresignedPost(client, {
            Bucket,
            Key,
            // @ts-ignore
            Conditions,
            Fields,
            Expires: 600, //Seconds before the presigned post expires. 3600 by default.
        });

        console.debug('url: ', url);
        console.debug('fields: ', JSON.stringify(fields));

        resolve({ method: 'POST', url, fields });
    });
};
