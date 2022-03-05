import IRoute from '../types/IRoute';

export enum ERestApiDefaultRoutesKeys {
    'createFileCheckSlotForAnonymousUpload'
}

type TRoutes = { [key in ERestApiDefaultRoutesKeys]: IRoute };

export const restApiDefaultRoutes: TRoutes = {
    [ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload]: { verb: 'POST', path: '/anonymous-upload-file-check-slots/' }
}
