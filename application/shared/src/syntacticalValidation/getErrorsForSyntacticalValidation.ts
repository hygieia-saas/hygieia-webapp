import { TSyntacticalValidationErrorRecord, TSyntacticalValidationRules } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorsForSyntacticalValidation = <T extends Record<keyof T, any>>(validationRules: TSyntacticalValidationRules<T>, data: T): TSyntacticalValidationErrorRecord<T> | null => {
    let valid = true;
    const newErrors: TSyntacticalValidationErrorRecord<T> = {};
    for (const key in validationRules) {
        const value = data[key];
        const validation = validationRules[key];
        if (validation?.required?.value && !value) {
            valid = false;
            newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
            valid = false;
            newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
            valid = false;
            newErrors[key] = custom.message;
        }
    }

    if (!valid) {
        return newErrors;
    } else {
        return null;
    }
};

export default getErrorsForSyntacticalValidation;
