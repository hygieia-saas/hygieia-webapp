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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { anonymousFileuploadSlice } from './anonymousFileuploadSlice';

const UploadWidget = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        restrictions: { maxNumberOfFiles: 1 },
        autoProceed: true,
        locale: reduxState.translations.iso639_1LanguageCode === 'en' ? English as Locale : German as Locale,
        allowMultipleUploads: false
    });

    if (   reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo !== null
        && reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo.presignedPost !== null
    ) {
        const presignedPost = reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo.presignedPost;
        uppy.use(AwsS3, {
                limit: 1,
                getUploadParameters: async () => {
                    return new Promise((resolve, reject) => {
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

        uppy.on('upload', () => {
            reduxDispatch(anonymousFileuploadSlice.actions.uploadStarted());
        })

        uppy.on('progress', (progress: number) => {
            reduxDispatch(anonymousFileuploadSlice.actions.uploadProgressedTo(progress));
        })

        uppy.on('upload-success', () => {
            reduxDispatch(anonymousFileuploadSlice.actions.uploadFinishedSuccessfully());
        })

        return <>
            <Dashboard
                uppy={uppy}
                theme={reduxState.uiSettings.darkMode ? 'dark' : 'light'}
                width={'100%'}
                hideRetryButton={true}
                showProgressDetails={true}
                hidePauseResumeButton={true}
                hideCancelButton={true}
                disableStatusBar={false}
            />
        </>;
    } else {
        return <></>;
    }
};

export default UploadWidget;
