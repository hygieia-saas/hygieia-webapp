import { APIGatewayProxyHandler } from 'aws-lambda';
import { registerUserAction } from './features/session/controller/usersController';
import { createJsonResponse } from './app/util/controllerUtils';
import { createApiKeyAction } from './features/session/controller/apiKeysController';
import { getPresignedPostForAnonymousUploadAction } from './features/fileupload/service/fileuploadController';

export const handler: APIGatewayProxyHandler = async (event) => {
    console.debug('Received event', event);

    const route = `${event.httpMethod} /${event.pathParameters?.proxy as string}`;

    if (route === 'POST /users/') {
        return registerUserAction(event);
    }

    if (route === 'POST /webapp-api-keys/') {
        console.debug('Handling event with createApiKeyAction');
        return createApiKeyAction(event);
    }

    if (route === 'POST /anonymous-upload-presigned-posts/') {
        return getPresignedPostForAnonymousUploadAction(event);
    }

    return createJsonResponse({
        statusCode: 'NotImplemented',
        body: `No controller action for routeKey ${route} found.`
    });
}
