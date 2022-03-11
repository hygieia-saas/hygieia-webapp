import UrlPattern from 'url-pattern';
import { THttpMethod } from '../types/THttpMethod';

export interface IRestApiDefaultRoute {
    readonly verb: THttpMethod,
    readonly pathPattern: UrlPattern
}

export enum ERestApiDefaultRouteNames {
    registerUser,
    createApiKey,
    createFileCheckSlotForAnonymousUpload,
    getFileCheckSlotForAnonymousUploadStatus,
}

export const restApiDefaultRoutes: { [key in ERestApiDefaultRouteNames]: IRestApiDefaultRoute } = {
    [ERestApiDefaultRouteNames.registerUser]: {
        verb: 'POST',
        pathPattern: new UrlPattern('users/')
    },

    [ERestApiDefaultRouteNames.createApiKey]: {
        verb: 'POST',
        pathPattern: new UrlPattern('webapp-api-keys/')
    },

    [ERestApiDefaultRouteNames.createFileCheckSlotForAnonymousUpload]: {
        verb: 'POST',
        pathPattern: new UrlPattern('anonymous-upload-file-check-slots/')
    },

    [ERestApiDefaultRouteNames.getFileCheckSlotForAnonymousUploadStatus]: {
        verb: 'GET',
        pathPattern: new UrlPattern('anonymous-upload-file-check-slots/:id/status')
    }
}

export const getRestApiDefaultRouteName = (verb: IRestApiDefaultRoute['verb'], path: string): ERestApiDefaultRouteNames|null => {

    for (const [routeName, routeDefinition] of Object.entries(restApiDefaultRoutes)) {
        if (routeDefinition.verb === verb && routeDefinition.pathPattern.match(path) !== null) {
            return parseInt(routeName) as ERestApiDefaultRouteNames;
        }
    }

    return null;
}
