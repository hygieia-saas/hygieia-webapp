import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    startRepeatedlyGetFileCheckSlotStatusInfo
} from './anonymousFileuploadSlice';

const FileCheckSlotStatusInfoUpdater = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    if (reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo !== null) {
        void reduxDispatch(
            startRepeatedlyGetFileCheckSlotStatusInfo(
                reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo.id
            )
        );
        return <></>
    }

    return <></>;
};

export default FileCheckSlotStatusInfoUpdater;
