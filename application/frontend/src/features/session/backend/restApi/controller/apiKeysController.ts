import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { getBody } from '../../../../../app/util/apiGatewayProxyEventUtils';
import {
    credentialsSyntacticalValidationRules,
    getErrorsForSyntacticalValidation,
    ICredentials,
    validateCredentialsStructurally
} from 'hygieia-webapp-shared';
import { createJsonResponse, jsonResponseWithExtractedErrorMessage } from '../../../../../app/util/controllerUtils';
import { createApiKey } from '../service/apiKeyService';

export const createApiKeyAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
    const body = getBody(event);

    let credentials: ICredentials;
    try {
        credentials = JSON.parse(body ? body : '') as ICredentials;
        console.debug('About to validate credentials structurally');
        validateCredentialsStructurally(credentials);
        console.debug('Validating credentials structurally did not throw an exception');
    } catch (e) {
        console.debug('Validating credentials structurally did throw an exception', e);
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
        console.debug('Validating credentials structurally resulted in errors', errorsForSyntacticalValidation);
        return createJsonResponse({
            statusCode: 'BadRequest',
            body: JSON.stringify(errorsForSyntacticalValidation)
        });
    }

    console.debug('About to create api keys');
    const result = await createApiKey(credentials);

    if (result.successful) {
        console.debug('Successfully created api keys');
        return createJsonResponse({
            statusCode: 'Created',
            body: result.storedApiKey?.id as string
        });
    } else {
        if (result.error === 'WrongPassword') {
            console.debug('Error creating api keys: wrong password');
            return createJsonResponse({
                statusCode: 'Forbidden',
                body: 'The provided password is invalid for this user.'
            });
        } else if (result.error === 'UnknownUser') {
            console.debug('Error creating api keys: unknown user');
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
