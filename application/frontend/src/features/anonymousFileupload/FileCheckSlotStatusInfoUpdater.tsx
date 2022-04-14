import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFileCheckSlotPresignedPostInfo } from './anonymousFileuploadSlice';
import { Recaptcha } from '../session/Recaptcha';
import ContentParagraph from '../../elements/ContentParagraph';

const FileCheckSlotStatusInfoUpdater = (): JSX.Element => {

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

    if (reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo === null
        && !reduxState.anonymousFileupload.getFileCheckSlotPresignedPostInfoOperation.isRunning
        && !reduxState.anonymousFileupload.getFileCheckSlotPresignedPostInfoOperation.justFinishedSuccessfully
        && reduxState.anonymousFileupload.getFileCheckSlotPresignedPostInfoOperation.errorMessage === null
    ) {
        void reduxDispatch(getFileCheckSlotPresignedPostInfo());
        return <></>
    }

    if (reduxState.anonymousFileupload.getFileCheckSlotPresignedPostInfoOperation.isRunning) {
        return <ContentParagraph>
            { reduxState.translations.translations['anonymousFileupload.preparingUploadSlot'] }
        </ContentParagraph>
    }

    return <></>;
};

export default FileCheckSlotStatusInfoUpdater;
