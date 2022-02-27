import React from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { Dashboard } from '@uppy/react';
import { Locale } from '@uppy/core';
// @ts-ignore
import German from '@uppy/locales/lib/de_DE';
// @ts-ignore
import English from '@uppy/locales/lib/en_US';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useAppSelector } from '../../app/hooks';

const UploadWidget = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        restrictions: { maxNumberOfFiles: 1 },
        autoProceed: true,
        locale: reduxState.translations.iso639_1LanguageCode === 'en' ? English as Locale : German as Locale
    });

    uppy.use(AwsS3, {
        limit: 1,
        getUploadParameters: async () => {
                return new Promise((resolve, reject) => {
                    const presignedPost = reduxState.anonymousFileupload.presignedPost;

                    if (presignedPost === null) {
                        reject('presignedPost is null.');
                    } else {
                        resolve({
                            method: presignedPost.method,
                            url: presignedPost.url,
                            fields: presignedPost.fields
                        });
                    }
                });
            }
        }
    );

    return <>
        <Dashboard
            uppy={uppy}
            theme={reduxState.uiSettings.darkMode ? 'dark' : 'light'}
        />
    </>;
};

export default UploadWidget;
