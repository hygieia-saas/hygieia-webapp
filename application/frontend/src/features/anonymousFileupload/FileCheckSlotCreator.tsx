import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFileCheckSlotPresignedPostInfo } from './anonymousFileuploadSlice';
import { Recaptcha } from '../session/Recaptcha';
import ContentBlock from '../../elements/ContentBlock';
import Spinner from '../../elements/Spinner';

const FileCheckSlotCreator = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    if (reduxState.session.recaptchaResponseKey === null) {
        return <>
            <ContentBlock>
                { reduxState.translations.translations['anonymousFileupload.proveYouAreNotARobot'] }
            </ContentBlock>
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
        return <ContentBlock>
            <Spinner text={ reduxState.translations.translations['anonymousFileupload.preparingUploadSlot'] }/>
        </ContentBlock>
    }

    return <></>;
};

export default FileCheckSlotCreator;
