import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { getPresignedPostForAnonymousUpload } from './fileuploadService';
import { createJsonResponse } from '../../../app/util/controllerUtils';

export const getPresignedPostForAnonymousUploadAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
    const presignedPost = await getPresignedPostForAnonymousUpload();

    return createJsonResponse({
        statusCode: 'Created',
        body: presignedPost
    });
}
