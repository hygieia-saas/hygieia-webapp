import ICredentials from './types/ICredentials';
import { IFileCheckSlot, IPresignedPost } from './types/IFileCheckSlot';
import validateCredentialsStructurally from './types/ICredentials.validator';
import returnWithExtractedErrorMessage from './util/returnWithExtractedErrorMessage';
import { TSyntacticalValidationErrorRecord, TSyntacticalValidationRules } from './syntacticalValidation/types';
import credentialsSyntacticalValidationRules from './syntacticalValidation/credentialsSyntacticalValidationRules';
import getErrorsForSyntacticalValidation from './syntacticalValidation/getErrorsForSyntacticalValidation';

export {
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
