import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPresignedUrlCommand } from './anonymousFileuploadSlice';

const PresignedUrlReceiver = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    if (reduxState.anonymousFileupload.presignedUrl === null
        && !reduxState.anonymousFileupload.getPresignedUrlOperation.isRunning
        && !reduxState.anonymousFileupload.getPresignedUrlOperation.justFinishedSuccessfully
        && reduxState.anonymousFileupload.getPresignedUrlOperation.errorMessage === null
    ) {
        console.log('bejfuir');
        void reduxDispatch(getPresignedUrlCommand());
    }

    return <>
        <pre>
            {JSON.stringify(reduxState.anonymousFileupload, null, 2)}
        </pre>
    </>;
};

export default PresignedUrlReceiver;
