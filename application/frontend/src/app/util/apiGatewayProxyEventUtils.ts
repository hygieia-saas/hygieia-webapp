import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';

export const getBody = (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): string | null => {
    if (event.body === null) {
        return null;
    }
    let requestBody;
    if (event.isBase64Encoded) {
        requestBody = (Buffer.from(event.body, 'base64')).toString('utf8');
    } else {
        requestBody = event.body;
    }
    return requestBody;
}
