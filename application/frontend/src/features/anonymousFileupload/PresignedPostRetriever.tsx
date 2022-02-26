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
        && reduxState.session.recaptchaResponseKey !== null
    ) {
        void reduxDispatch(getPresignedPostCommand());
    }

    return <></>;
};

export default PresignedPostReceiver;
