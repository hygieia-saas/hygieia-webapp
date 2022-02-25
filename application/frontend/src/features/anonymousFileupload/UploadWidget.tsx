import React from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const UploadWidget = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        restrictions: { maxNumberOfFiles: 1 },
        autoProceed: true
    });

    uppy.use(AwsS3, {
        getUploadParameters: async (uppyFile) => {
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
        />
    </>;
};

export default UploadWidget;
