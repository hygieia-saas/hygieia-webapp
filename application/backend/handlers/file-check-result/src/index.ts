import { S3Handler } from 'aws-lambda';
import { S3Client, GetObjectTaggingCommand } from '@aws-sdk/client-s3';

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

    return;
}
