import { APIGatewayProxyHandler } from 'aws-lambda';
import { registerUserAction } from './features/session/controller/usersController';
import { createJsonResponse } from './app/util/controllerUtils';
import { createApiKeyAction } from './features/session/controller/apiKeysController';
import {
    createFileCheckSlotForAnonymousUploadAction,
    getFileCheckSlotForAnonymousUploadStatusAction
} from './features/fileupload/service/fileuploadController';
import { IRoute, getRestApiDefaultRouteName, ERestApiDefaultRouteNames } from 'hygieia-webapp-shared';

export const handler: APIGatewayProxyHandler = async (event) => {
    console.debug('Received event', event);

    switch (getRestApiDefaultRouteName(event.httpMethod as IRoute['verb'], event.pathParameters?.proxy as string)) {
        case ERestApiDefaultRouteNames.registerUser:
            return registerUserAction(event);
        case ERestApiDefaultRouteNames.createApiKey:
            return createApiKeyAction(event);
        case ERestApiDefaultRouteNames.createFileCheckSlotForAnonymousUpload:
            return createFileCheckSlotForAnonymousUploadAction(event);
        case ERestApiDefaultRouteNames.getFileCheckSlotForAnonymousUploadStatus:
            return getFileCheckSlotForAnonymousUploadStatusAction(event);
    }

    return createJsonResponse({
        statusCode: 'NotImplemented',
        body: `No controller action for route ${event.httpMethod} ${event.pathParameters?.proxy as string} found.`
    });
}
