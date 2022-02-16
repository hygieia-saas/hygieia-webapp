export type TSyntacticalValidationErrorRecord<T> = Partial<Record<keyof T, string>>;

export type TSyntacticalValidationRules<T> = Partial<Record<keyof T, ISyntacticalValidationRule>>;

export interface ISyntacticalValidationRule {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid: (value: string) => boolean;
        message: string;
    };
}
