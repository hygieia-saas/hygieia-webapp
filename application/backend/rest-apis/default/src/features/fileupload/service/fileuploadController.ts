import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { getPresignedPostForAnonymousUpload } from './fileuploadService';
import { createJsonResponse } from '../../../app/util/controllerUtils';
import { getBody } from '../../../app/util/apiGatewayProxyEventUtils';

export const getPresignedPostForAnonymousUploadAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
    const body = getBody(event);

    const parsedBody = JSON.parse(body ? body : '') as { recaptchaResponseKey: string };

    try {
        const presignedPost = await getPresignedPostForAnonymousUpload(parsedBody.recaptchaResponseKey);

        return createJsonResponse({
            statusCode: 'Created',
            body: presignedPost
        });
    } catch (e) {
        return createJsonResponse({
            statusCode: 'Forbidden',
            body: 'Recaptcha was not solved correctly.'
        });
    }
}
