import ICredentials from '../types/ICredentials';
import { TSyntacticalValidationRules } from './types';

const credentialsSyntacticalValidationRules: TSyntacticalValidationRules<ICredentials> = {
    email: {
        pattern: {
            value: '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            message: 'syntacticalValidationRule.credentials.email.pattern',
        },
    },
    password: {
        required: {
            value: true,
            message: 'syntacticalValidationRule.credentials.password.required',
        },
        custom: {
            isValid: (value: string) => value.length > 5,
            message: 'syntacticalValidationRule.credentials.password.custom',
        },
    },
};

export default credentialsSyntacticalValidationRules;
