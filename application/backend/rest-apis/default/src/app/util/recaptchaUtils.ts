import fetch from 'cross-fetch';

export const recaptchaResponseKeyIsValid = async (responseKey: string): Promise<boolean> => {

    const secretKey = '6LfP3qAeAAAAANSXVQ6Sycv3zgvhcv2OHGIgL0dt';
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
