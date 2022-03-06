import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';
import { v1 as uuidv1 } from 'uuid';
import { IFileCheckSlotClientInfo, IPresignedPost } from 'hygieia-webapp-shared';
import AWS, { ETables } from '../../../app/util/awsSdkUtils';

export const getPresignedPostForAnonymousUpload = async (): Promise<IPresignedPost> => {

    // https://medium.com/@aidan.hallett/securing-aws-s3-uploads-using-presigned-urls-aa821c13ae8d
    // https://stackoverflow.com/questions/13390343/s3-direct-upload-restricting-file-size-and-type
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html
    // https://stackoverflow.com/questions/36783108/amazon-s3-presigned-url-invalidate-manually-or-one-time-upload


    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html

    return new Promise(async (resolve) => {
        const key = uuidv1();
        const Conditions = [
            { 'key': key },
            { 'bucket': process.env.ANONYMOUSUPLOADS_BUCKET_NAME as string },
            ['content-length-range', 1, 10485760]
        ];

        const client = new S3Client({ region: process.env.ANONYMOUSUPLOADS_BUCKET_REGION as string });
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


export const createFileCheckSlot = async (): Promise<IFileCheckSlotClientInfo> => {

    const presignedPost = await getPresignedPostForAnonymousUpload();

    const docClient = new AWS.DynamoDB.DocumentClient();
    const fileCheckSlotId = uuidv1();

    if (await new Promise<boolean>((resolve) => {
        docClient.put(
            {
                TableName: ETables.fileCheckSlots,
                Item: {
                    id: fileCheckSlotId,
                    status: 0,
                    presigned_post_bucket: presignedPost.fields.bucket,
                    presigned_post_key: presignedPost.fields.key
                }
            },
            (err) => {
                if (err) {
                    console.error(err);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
    })) {
        return {
            id: fileCheckSlotId,
            presignedPost
        };
    } else {
        throw new Error(`Could not create entry in table ${ETables.fileCheckSlots}`);
    }
};
