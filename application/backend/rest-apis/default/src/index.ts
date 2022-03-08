import { APIGatewayProxyHandler } from 'aws-lambda';
import { registerUserAction } from './features/session/controller/usersController';
import { createJsonResponse } from './app/util/controllerUtils';
import { createApiKeyAction } from './features/session/controller/apiKeysController';
import {
    createFileCheckSlotForAnonymousUploadAction,
    getFileCheckSlotForAnonymousUploadStatusAction
} from './features/fileupload/service/fileuploadController';
import { ERestApiDefaultRoutesKeys, restApiDefaultRoutes } from 'hygieia-webapp-shared';

export const handler: APIGatewayProxyHandler = async (event) => {
    console.debug('Received event', event);

    const route = `${event.httpMethod} /${event.pathParameters?.proxy as string}`;

    switch (route) {
        case `${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.registerUser].verb} ${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.registerUser].path}`:
            return registerUserAction(event);

        case `${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createApiKey].verb} ${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createApiKey].path}`:
            return createApiKeyAction(event);

        case `${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].verb} ${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].path}`:
            return createFileCheckSlotForAnonymousUploadAction(event);

        case `${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].verb} ${restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].path}`:
            return getFileCheckSlotForAnonymousUploadStatusAction(event);
    }

    return createJsonResponse({
        statusCode: 'NotImplemented',
        body: `No controller action for routeKey ${route} found.`
    });
}
