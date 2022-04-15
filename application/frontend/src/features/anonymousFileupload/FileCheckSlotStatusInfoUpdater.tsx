import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    startRepeatedlyGetFileCheckSlotStatusInfo
} from './anonymousFileuploadSlice';
import Spinner from '../../elements/Spinner';

const FileCheckSlotStatusInfoUpdater = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    if (   reduxState.anonymousFileupload.uploadFinishedSuccessfully !== null
        && reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo !== null
    ) {
        void reduxDispatch(
            startRepeatedlyGetFileCheckSlotStatusInfo(
                reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo.id
            )
        );
    }

    return <>
        {
            (      reduxState.anonymousFileupload.uploadFinishedSuccessfully
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo !== null
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avStatus === "unknown"
            )
            &&
            <>
                <Spinner text={reduxState.translations.translations['anonymousFileupload.waitingForResult']}/>
            </>
        }
    </>;
};

export default FileCheckSlotStatusInfoUpdater;
