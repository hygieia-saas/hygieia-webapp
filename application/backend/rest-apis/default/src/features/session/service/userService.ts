import bcrypt from 'bcrypt';
import { v1 as uuidv1 } from 'uuid';
import AWS from '../../../app/util/awsSdkUtils';
import { ETables, ICredentials } from 'hygieia-webapp-shared';
import { getApiKeyById } from './apiKeyService';

export const passwordHashSaltOrRounds = 8;

enum ECreateUserResultErrors {
    AlreadyExists,
    Other
}

export interface ICreateUserResult {
    successful: boolean,
    error?: keyof typeof ECreateUserResultErrors
}


enum EGetUserResultErrors {
    NoSuchApiKey,
    NoSuchUserId,
    Other
}

export interface IGetUserResult {
    successful: boolean,
    error?: keyof typeof EGetUserResultErrors
    storedUser?: IStoredUser
}


export interface IStoredUser {
    id: string
    credentialsEmail: string
}

export const createUser = async (credentials: ICredentials): Promise<ICreateUserResult> => {

    const docClient = new AWS.DynamoDB.DocumentClient();

    credentials.email = credentials.email.toLowerCase();

    const userExists: boolean = await new Promise((resolve) => {
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
                    resolve(false);
                } else {
                    if (Object.prototype.hasOwnProperty.call(data, 'Item') && data.Item !== undefined) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
    });

    if (userExists) {
        return {
            successful: false,
            error: 'AlreadyExists'
        };
    } else {
        const hash = await bcrypt.hash(credentials.password, passwordHashSaltOrRounds);
        const userId = uuidv1();

        if (await new Promise<boolean>((resolve) => {
            docClient.put(
                {
                    TableName: ETables.credentials,
                    Item: {
                        email: credentials.email,
                        passwordHash: hash,
                        usersId: userId
                    }
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
            if (!await new Promise<boolean>((resolve) => {
                docClient.put(
                    {
                        TableName: ETables.users,
                        Item: {
                            id: userId,
                            credentialsEmail: credentials.email
                        }
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
                    successful: false,
                    error: 'Other'
                };
            }
        } else {
            return {
                successful: false,
                error: 'Other'
            };
        }

        return { successful: true };
    }
};

export const getUserByApiKeyId = async (apiKeyId: string): Promise<IGetUserResult> => {

    const docClient = new AWS.DynamoDB.DocumentClient();

    const getApiKeyResult = await getApiKeyById(apiKeyId);

    if (getApiKeyResult.successful) {
        const storedUser: IStoredUser|null = await new Promise((resolve) => {
            docClient.get(
                {
                    TableName: ETables.users,
                    Key: {
                        id: getApiKeyResult.storedApiKey?.usersId,
                    }
                },
                (err, data) => {
                    if (err) {
                        console.error(err);
                        resolve(null);
                    } else {
                        if (Object.prototype.hasOwnProperty.call(data, 'Item') && data.Item !== undefined) {
                            resolve({ id: data.Item.id as string, credentialsEmail: data.Item.credentialsEmail as string });
                        } else {
                            resolve(null);
                        }
                    }
                });
        });

        if (storedUser === null) {
            return {
                successful: false,
                error: 'NoSuchUserId'
            }
        } else {
            return {
                successful: true,
                storedUser: storedUser
            }
        }
    } else {
        return {
            successful: false,
            error: 'NoSuchApiKey'
        }
    }
};
