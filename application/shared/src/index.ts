import ICredentials from './types/ICredentials';
import IFileCheckSlotInfo from './types/IFileCheckSlotInfo';
import IPresignedPost  from './types/IPresignedPost';
import validateCredentialsStructurally from './types/ICredentials.validator';
import returnWithExtractedErrorMessage from './util/returnWithExtractedErrorMessage';
import { TSyntacticalValidationErrorRecord, TSyntacticalValidationRules } from './syntacticalValidation/types';
import credentialsSyntacticalValidationRules from './syntacticalValidation/credentialsSyntacticalValidationRules';
import getErrorsForSyntacticalValidation from './syntacticalValidation/getErrorsForSyntacticalValidation';
import { IRoute, restApiDefaultRoutes, getRestApiDefaultRouteName, ERestApiDefaultRouteNames } from './values/restApiDefaultRoutes';

export {
    IRoute,
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
}
