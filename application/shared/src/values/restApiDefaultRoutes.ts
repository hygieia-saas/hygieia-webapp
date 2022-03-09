import UrlPattern from 'url-pattern';

interface IRoute {
    readonly verb: 'GET' | 'POST' | 'PUT' | 'DELETE',
    readonly pathPattern: UrlPattern
}

export enum ERouteNames {
    registerUser,
    createApiKey,
    createFileCheckSlotForAnonymousUpload,
    getFileCheckSlotForAnonymousUploadStatus,
}

export const restApiDefaultRoutes: { [key in ERouteNames]: IRoute } = {
    [ERouteNames.registerUser]: {
        verb: 'POST',
        pathPattern: new UrlPattern('/users/')
    },

    [ERouteNames.createApiKey]: {
        verb: 'POST',
        pathPattern: new UrlPattern('/webapp-api-keys/')
    },

    [ERouteNames.createFileCheckSlotForAnonymousUpload]: {
        verb: 'POST',
        pathPattern: new UrlPattern('/anonymous-upload-file-check-slots/')
    },

    [ERouteNames.getFileCheckSlotForAnonymousUploadStatus]: {
        verb: 'GET',
        pathPattern: new UrlPattern('/anonymous-upload-file-check-slots/:id/status')
    }
}

export const getRouteName = (verb: IRoute['verb'], url: string): ERouteNames|null => {

    for (const [routeName, routeDefinition] of Object.entries(restApiDefaultRoutes)) {
        if (routeDefinition.verb === verb && routeDefinition.pathPattern.match(url) !== null) {
            if (routeName === "0") {
                return ERouteNames.registerUser;
            }
        }
    }

    return null;
}