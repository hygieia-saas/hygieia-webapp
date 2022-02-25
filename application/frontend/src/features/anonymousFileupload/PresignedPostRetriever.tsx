import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPresignedPostCommand } from './anonymousFileuploadSlice';

const PresignedPostReceiver = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    if (reduxState.anonymousFileupload.presignedPost === null
        && !reduxState.anonymousFileupload.getPresignedPostOperation.isRunning
        && !reduxState.anonymousFileupload.getPresignedPostOperation.justFinishedSuccessfully
        && reduxState.anonymousFileupload.getPresignedPostOperation.errorMessage === null
    ) {
        console.log('bejfuir');
        void reduxDispatch(getPresignedPostCommand());
    }

    return <>
        <pre>
            {JSON.stringify(reduxState.anonymousFileupload, null, 2)}
        </pre>
    </>;
};

export default PresignedPostReceiver;
