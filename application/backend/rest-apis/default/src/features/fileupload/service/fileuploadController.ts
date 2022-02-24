import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { getBody } from '../../../app/util/apiGatewayProxyEventUtils';
import { getPresignedUrlForAnonymousUpload } from './fileuploadService';
import { createJsonResponse } from '../../../app/util/controllerUtils';

export const getPresignedUrlForAnonymousUploadAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
    const body = getBody(event);

    const presignedUrl = await getPresignedUrlForAnonymousUpload('test.png');

    return createJsonResponse({
        statusCode: 'Created',
        body: presignedUrl
    });
}
