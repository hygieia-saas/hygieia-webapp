import UrlPattern from 'url-pattern';

interface IRoute {
    readonly verb: 'GET' | 'POST' | 'PUT' | 'DELETE',
    readonly pathPattern: UrlPattern
}

export const restApiDefaultRoutes: { [key in string]: IRoute } = {
    registerUser: {
        verb: 'POST',
        pathPattern: new UrlPattern('/users/')
    },

    createApiKey: {
        verb: 'POST',
        pathPattern: new UrlPattern('/webapp-api-keys/')
    },

    createFileCheckSlotForAnonymousUpload: {
        verb: 'POST',
        pathPattern: new UrlPattern('/anonymous-upload-file-check-slots/')
    },

    getFileCheckSlotForAnonymousUploadStatus: {
        verb: 'GET',
        pathPattern: new UrlPattern('/anonymous-upload-file-check-slots/:id/status')
    }
}
