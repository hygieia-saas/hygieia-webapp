import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { getBody } from '../../../../../app/restApiUtils/apiGatewayProxyEventUtils';
import { createUser } from '../service/userService';
import { createJsonResponse, jsonResponseWithExtractedErrorMessage } from '../../../../../app/restApiUtils/controllerUtils';
import {
    credentialsSyntacticalValidationRules,
    getErrorsForSyntacticalValidation,
    ICredentials,
    validateCredentialsStructurally
} from 'hygieia-webapp-shared';

export const registerUserAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
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

    const createUserResult = await createUser(credentials);
    if (createUserResult.successful) {
        return createJsonResponse({
            statusCode: 'Created',
            body: null
        });
    } else {
        if (createUserResult.error === 'AlreadyExists') {
            return createJsonResponse({
                statusCode: 'BadRequest',
                body: `User with e-mail ${credentials.email} already exists.`
            });
        } else {
            return createJsonResponse({
                statusCode: 'InternalServerError',
                body: `Unexpected problem.`
            });
        }
    }
};
