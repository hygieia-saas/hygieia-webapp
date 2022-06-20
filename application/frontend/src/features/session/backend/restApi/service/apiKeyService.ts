import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import AWS from '../../../../../app/util/awsSdkUtils';
import { ETables, ICredentials } from 'hygieia-webapp-shared';

export enum ECreateApiKeyResultErrors {
    UnknownUser,
    WrongPassword,
    CouldNotStoreKey,
    Other
}

export interface ICreateApiKeyResult {
    successful: boolean,
    error?: keyof typeof ECreateApiKeyResultErrors
    storedApiKey?: IStoredApiKey
}

export enum EGetApiKeyResultErrors {
    NotFound,
    Other
}

export interface IGetApiKeyResult {
    successful: boolean,
    error?: keyof typeof EGetApiKeyResultErrors
    storedApiKey?: IStoredApiKey
}

interface IStoredCredentials {
    email: string,
    passwordHash: string,
    usersId: string
}

interface IStoredApiKey {
    id: string,
    usersId: string
    apiName: string
}

export const createApiKey = async (credentials: ICredentials): Promise<ICreateApiKeyResult> => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    credentials.email = credentials.email.toLowerCase();

    const storedCredentials: IStoredCredentials | null = await new Promise((resolve) => {
        docClient.get(
            {
                TableName: ETables.credentials,
                Key: {
                    email: credentials.email,
                }
            },
            (err, data) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                } else {
                    if (Object.prototype.hasOwnProperty.call(data, 'Item') && data.Item !== undefined) {
                        const item = data.Item as IStoredCredentials;
                        // @TODO add ajv validation
                        resolve({
                            email: item.email,
                            passwordHash: item.passwordHash,
                            usersId: item.usersId
                        });
                    } else {
                        resolve(null);
                    }
                }
            });
    });

    if (storedCredentials === null) {
        return {
            successful: false,
            error: 'UnknownUser'
        };
    }

    if (!await bcrypt.compare(credentials.password, storedCredentials.passwordHash)) {
        console.log(`Comparison of password '${credentials.password}' with stored password hash '${storedCredentials.passwordHash}' failed.`);
        return {
            successful: false,
            error: 'WrongPassword'
        };
    }

    const storedApiKey: IStoredApiKey = {
        id: uuidv4(),
        usersId: storedCredentials.usersId,
        apiName: 'defaultRestApi'
    }

    if (await new Promise<boolean>((resolve) => {
        docClient.put(
            {
                TableName: ETables.apiKeys,
                Item: storedApiKey
            },
            (err) => {
                if (err) {
                    console.error(err);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
    })) {
        return {
            successful: true,
            storedApiKey: storedApiKey
        }
    } else {
        return {
            successful: false,
            error: 'CouldNotStoreKey'
        }
    }
};

export const getApiKeyById = async (apiKeyId: string): Promise<IGetApiKeyResult> => {

    const docClient = new AWS.DynamoDB.DocumentClient();

    const storedApiKey: IStoredApiKey|null = await new Promise((resolve) => {
        docClient.get(
            {
                TableName: ETables.apiKeys,
                Key: {
                    id: apiKeyId,
                }
            },
            (err, data) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                } else {
                    if (Object.prototype.hasOwnProperty.call(data, 'Item') && data.Item !== undefined) {
                        resolve({ id: apiKeyId, usersId: data.Item.usersId as string, apiName: data.Item.apiName as string });
                    } else {
                        resolve(null);
                    }
                }
            });
    });

    if (storedApiKey === null) {
        return {
            successful: false,
            error: 'NotFound',
        }
    } else {
        return {
            successful: true,
            storedApiKey
        }
    }
};
