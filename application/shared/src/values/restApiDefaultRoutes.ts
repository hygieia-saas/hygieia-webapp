import IRoute from '../types/IRoute';

export enum ERestApiDefaultRoutesKeys {
    'registerUser',
    'createApiKey',
    'createFileCheckSlotForAnonymousUpload',
    'getFileCheckSlotForAnonymousUploadStatus'
}

type TRoutes = { [key in ERestApiDefaultRoutesKeys]: IRoute };

export const restApiDefaultRoutes: TRoutes = {
    [ERestApiDefaultRoutesKeys.registerUser]: { verb: 'POST', path: '/users/' },
    [ERestApiDefaultRoutesKeys.createApiKey]: { verb: 'POST', path: '/webapp-api-keys/' },
    [ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload]: { verb: 'POST', path: '/anonymous-upload-file-check-slots/' },
    [ERestApiDefaultRoutesKeys.getFileCheckSlotForAnonymousUploadStatus]: { verb: 'GET', path: '/anonymous-upload-file-check-slots/:id/status' }
}
