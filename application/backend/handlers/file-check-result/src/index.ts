import { S3Handler } from 'aws-lambda';

export const handler: S3Handler = async (event) => {
    console.debug('Received event', event);

    console.debug('stringify event');
    JSON.stringify(event, null, 2);

    console.debug('stringify event.Records[0].s3');
    JSON.stringify(event.Records[0].s3, null, 2);

    console.debug('stringify event.Records[0].requestParameters');
    JSON.stringify(event.Records[0].requestParameters, null, 2);

    return;
}
