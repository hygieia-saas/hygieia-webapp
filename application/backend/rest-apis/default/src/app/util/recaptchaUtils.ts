import fetch from 'cross-fetch';
import AWS from './awsSdkUtils';
import { ETables } from 'hygieia-webapp-shared';

export const recaptchaResponseKeyIsValid = async (responseKey: string): Promise<boolean> => {

    const secretKey = await getRecaptchaSecretKeyAppSetting();
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`;

    return new Promise<boolean>((resolve => {
        fetch(url, {
            method: 'post',
        })
            .then((response) => response.json())
            .then((google_response) => {
                // @ts-ignore
                resolve(google_response.success === true);
            })
            .catch((error) => {
                resolve(false);
            });
    }));
};

const getRecaptchaSecretKeyAppSetting = async (): Promise<string|null> => {

    const docClient = new AWS.DynamoDB.DocumentClient();

    return await new Promise((resolve) => {
        docClient.get(
            {
                TableName: ETables.appSettings,
                Key: {
                    id: 'recaptchaSecretKey',
                }
            },
            (err, data) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                } else {
                    if (Object.prototype.hasOwnProperty.call(data, 'Item') && data.Item !== undefined) {
                        resolve(data.Item.value as string);
                    } else {
                        resolve(null);
                    }
                }
            });
    });
};
