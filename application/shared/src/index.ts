import ICredentials from './types/ICredentials';
import IPresignedPost  from './types/IPresignedPost';
import IFileCheckSlotPresignedPostInfo from './types/IFileCheckSlotPresignedPostInfo';
import IFileCheckSlotStatusInfo from './types/IFileCheckSlotStatusInfo';
import validateCredentialsStructurally from './types/ICredentials.validator';
import returnWithExtractedErrorMessage from './util/returnWithExtractedErrorMessage';
import { TSyntacticalValidationErrorRecord, TSyntacticalValidationRules } from './syntacticalValidation/types';
import credentialsSyntacticalValidationRules from './syntacticalValidation/credentialsSyntacticalValidationRules';
import getErrorsForSyntacticalValidation from './syntacticalValidation/getErrorsForSyntacticalValidation';
import { IRestApiDefaultRoute, restApiDefaultRoutes, getRestApiDefaultRouteName, ERestApiDefaultRouteNames } from './routes/restApiDefaultRoutes';
import { ETables } from './enums/ETables';
import { EFileCheckAvStatus } from './enums/EFileCheckAvStatus';
import { getFileCheckSlotId } from './util/getFileCheckSlotId';

export {
    IRestApiDefaultRoute,
    restApiDefaultRoutes,
    getRestApiDefaultRouteName,
    ERestApiDefaultRouteNames,

    ICredentials,
    validateCredentialsStructurally,
    credentialsSyntacticalValidationRules,

    IPresignedPost,
    IFileCheckSlotPresignedPostInfo,
    IFileCheckSlotStatusInfo,


    TSyntacticalValidationErrorRecord,
    TSyntacticalValidationRules,
    getErrorsForSyntacticalValidation,
    returnWithExtractedErrorMessage,

    ETables,
    EFileCheckAvStatus,

    getFileCheckSlotId
}
