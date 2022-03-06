import AWS from 'aws-sdk';

AWS.config.update({region: 'us-east-1'});

export default AWS;

export enum ETables {
    users = 'users',
    credentials = 'credentials',
    apiKeys = 'api_keys',
    fileCheckSlots = 'fileCheckSlots'
}
