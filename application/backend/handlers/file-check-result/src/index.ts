import { S3Handler } from 'aws-lambda';
import { S3Client, GetObjectTaggingCommand } from '@aws-sdk/client-s3';
import { ETables, getFileCheckSlotId } from 'hygieia-webapp-shared';
import AWS from 'aws-sdk';

export const handler: S3Handler = async (event) => {
    console.debug('Received event', event);

    console.debug('stringify event');
    console.debug(JSON.stringify(event, null, 2));

    console.debug('stringify event.Records[0].s3');
    console.debug(JSON.stringify(event.Records[0].s3, null, 2));

    console.debug('stringify event.Records[0].requestParameters');
    console.debug(JSON.stringify(event.Records[0].requestParameters, null, 2));

    const client = new S3Client({ region: event.Records[0].awsRegion as string });
    const bucket = event.Records[0].s3.bucket.name as string;
    const key = event.Records[0].s3.object.key as string;
    const command = new GetObjectTaggingCommand({ Bucket: bucket, Key: key });

    const tags = await client.send(command);

    console.debug('stringify TagSet');
    console.debug(JSON.stringify(tags.TagSet, null, 2));

    AWS.config.update({region: 'us-east-1'});

    const docClient = new AWS.DynamoDB.DocumentClient();

    if (tags.TagSet !== undefined) {

        let avStatus = 'unknown'
        tags.TagSet.map(tag => {
            if (tag.Key === 'av-status') {
                avStatus = tag.Value?.toLowerCase() as string;
            }
        });

        if (await new Promise<boolean>((resolve) => {
            docClient.update(
                {
                    TableName: ETables.fileCheckSlots,
                    Key: { id: getFileCheckSlotId(event.Records[0].s3.bucket.name, event.Records[0].s3.object.key) },
                    UpdateExpression: 'set avStatus = :s',
                    ExpressionAttributeValues:{
                        ':s': avStatus
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
            return;
        } else {
            throw new Error(`Could not create entry in table ${ETables.fileCheckSlots}`);
        }
    }
}
