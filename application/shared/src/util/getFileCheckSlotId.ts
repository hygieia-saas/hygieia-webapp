import { sha512 } from 'js-sha512';

export const getFileCheckSlotId = (bucket: string, key: string): string => {
    return sha512(`${bucket} ${key} uHaEY3nfy9Po!QCGqU-Jp6Zmxuz4BzDcFgG7*N*b`);
};
