import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createFileCheckSlot } from './anonymousFileuploadSlice';
import { Recaptcha } from '../session/Recaptcha';
import ContentParagraph from '../../elements/ContentParagraph';

const PresignedPostReceiver = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    if (reduxState.session.recaptchaResponseKey === null) {
        return <>
            <ContentParagraph>
                { reduxState.translations.translations['anonymousFileupload.proveYouAreNotARobot'] }
            </ContentParagraph>
            <div className='mt-6'>
                <Recaptcha />
            </div>
        </>
    }

    if (reduxState.anonymousFileupload.presignedPost === null
        && !reduxState.anonymousFileupload.getPresignedPostOperation.isRunning
        && !reduxState.anonymousFileupload.getPresignedPostOperation.justFinishedSuccessfully
        && reduxState.anonymousFileupload.getPresignedPostOperation.errorMessage === null
    ) {
        void reduxDispatch(createFileCheckSlot());
        return <></>
    }

    if (reduxState.anonymousFileupload.getPresignedPostOperation.isRunning) {
        return <ContentParagraph>
            { reduxState.translations.translations['anonymousFileupload.preparingUploadSlot'] }
        </ContentParagraph>
    }

    return <></>;
};

export default PresignedPostReceiver;
