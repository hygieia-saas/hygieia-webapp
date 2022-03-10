import UrlPattern from 'url-pattern';

export interface IRoute {
    readonly verb: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS',
    readonly pathPattern: UrlPattern
}

export enum ERestApiDefaultRouteNames {
    registerUser,
    createApiKey,
    createFileCheckSlotForAnonymousUpload,
    getFileCheckSlotForAnonymousUploadStatus,
}

export const restApiDefaultRoutes: { [key in ERestApiDefaultRouteNames]: IRoute } = {
    [ERestApiDefaultRouteNames.registerUser]: {
        verb: 'POST',
        pathPattern: new UrlPattern('/users/')
    },

    [ERestApiDefaultRouteNames.createApiKey]: {
        verb: 'POST',
        pathPattern: new UrlPattern('/webapp-api-keys/')
    },

    [ERestApiDefaultRouteNames.createFileCheckSlotForAnonymousUpload]: {
        verb: 'POST',
        pathPattern: new UrlPattern('/anonymous-upload-file-check-slots/')
    },

    [ERestApiDefaultRouteNames.getFileCheckSlotForAnonymousUploadStatus]: {
        verb: 'GET',
        pathPattern: new UrlPattern('/anonymous-upload-file-check-slots/:id/status')
    }
}

export const getRestApiDefaultRouteName = (verb: IRoute['verb'], url: string): ERestApiDefaultRouteNames|null => {

    for (const [routeName, routeDefinition] of Object.entries(restApiDefaultRoutes)) {
        if (routeDefinition.verb === verb && routeDefinition.pathPattern.match(url) !== null) {
            return (<any>ERestApiDefaultRouteNames)[routeName];
        }
    }

    return null;
}
