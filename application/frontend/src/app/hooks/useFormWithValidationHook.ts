import { ChangeEvent, FormEvent, useState } from 'react';
import {
    getErrorsForSyntacticalValidation,
    TSyntacticalValidationErrorRecord,
    TSyntacticalValidationRules
} from 'hygieia-webapp-shared';

// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const useFormWithValidation = <T extends Record<keyof T, any> = {}>(options?: {
    validationRules?: TSyntacticalValidationRules<T>;
    initialValues?: Partial<T>;
    onSubmit?: () => void;
}) => {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T);
    const [errors, setErrors] = useState<TSyntacticalValidationErrorRecord<T>>({});

    // Needs to extend unknown so we can add a generic to an arrow function
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    const handleChange = <S extends unknown>(
        key: keyof T,
        sanitizeFn?: (value: string) => S
    ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationRules = options?.validationRules;
        if (validationRules) {
            const validationErrors = getErrorsForSyntacticalValidation(validationRules, data);
            if (validationErrors !== null) {
                setErrors(validationErrors);
                return;
            }
        }

        setErrors({});

        if (options?.onSubmit) {
            options.onSubmit();
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
    };
};
