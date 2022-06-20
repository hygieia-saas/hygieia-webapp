import { APIGatewayProxyHandler } from 'aws-lambda';
import { IFoo } from '../shared/IFoo';

export const handler: APIGatewayProxyHandler = async (event) => {

    const footoorama2: IFoo = { bar: 'baz' };

    if (footoorama2.bar === 'fhru') {
        console.log('yeah');
    }

    console.log(event.path);

    return {
        statusCode: 200,
        body: 'foo'
    }

};
