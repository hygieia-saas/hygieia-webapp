import ICredentials from './types/ICredentials';
import IFileCheckSlot from './types/IFileCheckSlot';
import IPresignedPost  from './types/IPresignedPost';
import validateCredentialsStructurally from './types/ICredentials.validator';
import returnWithExtractedErrorMessage from './util/returnWithExtractedErrorMessage';
import { TSyntacticalValidationErrorRecord, TSyntacticalValidationRules } from './syntacticalValidation/types';
import credentialsSyntacticalValidationRules from './syntacticalValidation/credentialsSyntacticalValidationRules';
import getErrorsForSyntacticalValidation from './syntacticalValidation/getErrorsForSyntacticalValidation';
import { restApiDefaultRoutes, ERestApiDefaultRoutesKeys } from './values/restApiDefaultRoutes';
import IRoute from './types/IRoute';

export {
    IRoute,
    restApiDefaultRoutes,
    ERestApiDefaultRoutesKeys,

    ICredentials,
    validateCredentialsStructurally,
    credentialsSyntacticalValidationRules,

    IFileCheckSlot,
    IPresignedPost,

    TSyntacticalValidationErrorRecord,
    TSyntacticalValidationRules,
    getErrorsForSyntacticalValidation,
    returnWithExtractedErrorMessage,
}
