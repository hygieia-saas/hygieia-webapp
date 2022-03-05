import { APIGatewayProxyHandler } from 'aws-lambda';
import { registerUserAction } from './features/session/controller/usersController';
import { createJsonResponse } from './app/util/controllerUtils';
import { createApiKeyAction } from './features/session/controller/apiKeysController';
import { createFileCheckSlotForAnonymousUploadAction } from './features/fileupload/service/fileuploadController';
import { ERestApiDefaultRoutesKeys, restApiDefaultRoutes } from 'hygieia-webapp-shared';

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

    if (route === `${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].verb} ${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].path}`) {
        return createFileCheckSlotForAnonymousUploadAction(event);
    }

    return createJsonResponse({
        statusCode: 'NotImplemented',
        body: `No controller action for routeKey ${route} found.`
    });
}
