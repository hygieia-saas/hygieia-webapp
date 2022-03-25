import ICredentials from './types/ICredentials';
import IFileCheckSlotInfo from './types/IFileCheckSlotInfo';
import IPresignedPost  from './types/IPresignedPost';
import validateCredentialsStructurally from './types/ICredentials.validator';
import returnWithExtractedErrorMessage from './util/returnWithExtractedErrorMessage';
import { TSyntacticalValidationErrorRecord, TSyntacticalValidationRules } from './syntacticalValidation/types';
import credentialsSyntacticalValidationRules from './syntacticalValidation/credentialsSyntacticalValidationRules';
import getErrorsForSyntacticalValidation from './syntacticalValidation/getErrorsForSyntacticalValidation';
import { IRestApiDefaultRoute, restApiDefaultRoutes, getRestApiDefaultRouteName, ERestApiDefaultRouteNames } from './routes/restApiDefaultRoutes';
import { ETables } from './enums/ETables';
import { getFileCheckSlotId } from './util/getFileCheckSlotId';

export {
    IRestApiDefaultRoute,
    restApiDefaultRoutes,
    getRestApiDefaultRouteName,
    ERestApiDefaultRouteNames,

    ICredentials,
    validateCredentialsStructurally,
    credentialsSyntacticalValidationRules,

    IFileCheckSlotInfo,
    IPresignedPost,

    TSyntacticalValidationErrorRecord,
    TSyntacticalValidationRules,
    getErrorsForSyntacticalValidation,
    returnWithExtractedErrorMessage,

    ETables,

    getFileCheckSlotId
}
