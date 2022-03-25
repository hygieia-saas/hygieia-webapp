import crypto from 'crypto';

export const getFileCheckSlotId = (bucket: string, key: string): string => {
    return crypto
        .createHash('sha512')
        .update(`${bucket} ${key} uHaEY3nfy9Po!QCGqU-Jp6Zmxuz4BzDcFgG7*N*b`)
        .digest('hex');
};
