import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { returnWithExtractedErrorMessage } from 'hygieia-webapp-shared'
import { getUserByApiKeyId, IStoredUser } from '../../features/session/backend/restApi/service/userService';

export enum EStatusCodes {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501
}

interface IJSONfyableResponseData {
    statusCode: keyof typeof EStatusCodes,
    body: any
}

export const createJsonResponse = (responseData: IJSONfyableResponseData): APIGatewayProxyResult => ({
    statusCode: EStatusCodes[responseData.statusCode],
    body: JSON.stringify(responseData.body, null, 2)
});

export const jsonResponseWithExtractedErrorMessage = (
    e: unknown,
    statusCodeIfExtracted: keyof typeof EStatusCodes,
    messageIfExtracted: string,
    statusCodeIfNotExtracted?: keyof typeof EStatusCodes,
    messageIfNotExtracted?: string
): APIGatewayProxyResult => {
    let _statusCodeIfNotExtracted: keyof typeof EStatusCodes = 'InternalServerError';
    if (statusCodeIfNotExtracted !== undefined) {
        _statusCodeIfNotExtracted = statusCodeIfNotExtracted;
    }
    let _messageIfNotExtracted = 'Internal server error: %msg%';
    if (messageIfNotExtracted !== undefined) {
        _messageIfNotExtracted = messageIfNotExtracted;
    }
    return returnWithExtractedErrorMessage<APIGatewayProxyResult>(
        e,
        (msg) =>
            createJsonResponse({
                statusCode: statusCodeIfExtracted,
                body: messageIfExtracted.replace('%msg%', msg)
            }),
        (msg) =>
            createJsonResponse({
                statusCode: _statusCodeIfNotExtracted,
                body: _messageIfNotExtracted.replace('%msg%', msg)
            })
    );
};

export const getUserFromProxyEvent = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<IStoredUser | null> => {
    const apiKeyId = event.headers['x-hygieia-webapp-default-rest-api-key-id'];

    if (apiKeyId === null || apiKeyId === undefined) {
        return null;
    } else {
        const getUserResult = await getUserByApiKeyId(apiKeyId);
        if (!getUserResult.successful || getUserResult.storedUser === undefined) {
            return null;
        } else {
            return getUserResult.storedUser;
        }
    }
};
