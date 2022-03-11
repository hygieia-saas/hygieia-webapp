import config from './config';
import { IRestApiDefaultRoute } from 'hygieia-webapp-shared';

export const defaultRestApiFetch = (path: string, method: IRestApiDefaultRoute['verb'], defaultRestApiKeyId: null | string = null, body: null | string = null, queryParams: { [key: string]: string } = {}): Promise<Response> => {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
    };

    if (defaultRestApiKeyId !== null) {
        headers['X-Hygieia-Webapp-Default-Rest-Api-Key-Id'] = defaultRestApiKeyId;
    }

    let isFirstQueryParam = true;
    let queryParamsString = '';
    for (const queryParamKey in queryParams) {
        if (isFirstQueryParam) {
            queryParamsString = '?';
            isFirstQueryParam = false;
        } else {
            queryParamsString += '&';
        }
        queryParamsString = `${queryParamsString}${queryParamKey}=${encodeURIComponent(queryParams[queryParamKey])}`
    }

    return fetch(
        `${config.backendApiBaseUri}${path}${queryParamsString}`,
        {
            method,
            mode: 'cors',
            headers,
            body
        }
    );
};
