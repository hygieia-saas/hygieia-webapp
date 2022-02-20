import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { getBody } from '../../../app/util/apiGatewayProxyEventUtils';
import {
    credentialsSyntacticalValidationRules,
    getErrorsForSyntacticalValidation,
    ICredentials,
    validateCredentialsStructurally
} from 'hygieia-webapp-shared';
import { createJsonResponse, jsonResponseWithExtractedErrorMessage } from '../../../app/util/controllerUtils';
import { createApiKey } from '../service/apiKeyService';

export const createApiKeyAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
    const body = getBody(event);

    let credentials: ICredentials;
    try {
        credentials = JSON.parse(body ? body : '') as ICredentials;
        validateCredentialsStructurally(credentials);
    } catch (e) {
        return jsonResponseWithExtractedErrorMessage(
            e,
            'BadRequest',
            'Request body is malformed: %msg%',
            'BadRequest',
            'Error parsing and/or validating request body: %msg%'
        );
    }

    const errorsForSyntacticalValidation = getErrorsForSyntacticalValidation(credentialsSyntacticalValidationRules, credentials);
    if (errorsForSyntacticalValidation !== null) {
        return createJsonResponse({
            statusCode: 'BadRequest',
            body: JSON.stringify(errorsForSyntacticalValidation)
        });
    }

    const result = await createApiKey(credentials);

    if (result.successful) {
        return createJsonResponse({
            statusCode: 'Created',
            body: result.storedApiKey?.id as string
        });
    } else {
        if (result.error === 'WrongPassword') {
            return createJsonResponse({
                statusCode: 'Forbidden',
                body: 'The provided password is invalid for this user.'
            });
        } else if (result.error === 'UnknownUser') {
            return createJsonResponse({
                statusCode: 'NotFound',
                body: 'Unknown user.'
            });
        } else {
            console.error(JSON.stringify(result));
            return createJsonResponse({
                statusCode: 'InternalServerError',
                body: 'Internal server error.'
            });
        }
    }
};
