import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import { createFileCheckSlot } from './fileuploadService';
import { createJsonResponse, jsonResponseWithExtractedErrorMessage } from '../../../app/util/controllerUtils';
import { getBody } from '../../../app/util/apiGatewayProxyEventUtils';
import { recaptchaResponseKeyIsValid } from '../../../app/util/recaptchaUtils';

export const createFileCheckSlotForAnonymousUploadAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
    const body = getBody(event);

    const parsedBody = JSON.parse(body ? body : '') as { recaptchaResponseKey: string };

    const recaptchaWasSolved = await recaptchaResponseKeyIsValid(parsedBody.recaptchaResponseKey);
    if (!recaptchaWasSolved) {
        return createJsonResponse({
            statusCode: 'Forbidden',
            body: 'Recaptcha was not solved correctly.'
        });
    }

    try {
        return createJsonResponse({
            statusCode: 'Created',
            body: await createFileCheckSlot()
        });
    } catch (e) {
        return jsonResponseWithExtractedErrorMessage(
            e,
            'InternalServerError',
            'Error while handling request: %msg%',
            'InternalServerError',
            '%msg%'
        );
    }
}

export const getFileCheckSlotForAnonymousUploadStatusAction = async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<APIGatewayProxyResult> => {
    return createJsonResponse({
        statusCode: 'NotFound',
        body: 'Recaptcha was not solved correctly.'
    });
};
