import React from 'react';
import { BadgeCheckIcon, XCircleIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    startRepeatedlyGetFileCheckSlotStatusInfo
} from './anonymousFileuploadSlice';
import Spinner from '../../elements/Spinner';
import ContentParagraph from '../../elements/ContentParagraph';

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
            <ContentParagraph>
                <Spinner text={reduxState.translations.translations['anonymousFileupload.waitingForResult']}/>
            </ContentParagraph>
        }

        {
            (      reduxState.anonymousFileupload.uploadFinishedSuccessfully
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo !== null
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avStatus === "clean"
            )
            &&
            <ContentParagraph>
                <div className='mt-10 bg-green-100 dark:bg-green-900 rounded-lg p-8'>
                    <BadgeCheckIcon className='h-24 w-24 text-green-700 dark:text-green-300 inline'/>
                    <span className='pl-2 text-green-700 dark:text-green-300 font-bold text-xl'>
                        {reduxState.translations.translations['anonymousFileupload.resultClean']}
                    </span>
                    <div className='mt-10 text-black dark:text-white'>
                        {reduxState.translations.translations['anonymousFileupload.resultCleanInfo']}
                    </div>
                </div>
            </ContentParagraph>
        }

        {
            (      reduxState.anonymousFileupload.uploadFinishedSuccessfully
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo !== null
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avStatus === "infected"
            )
            &&
            <ContentParagraph>
                <div className='mt-10 bg-red-100 dark:bg-red-900 rounded-lg p-8'>
                    <XCircleIcon className='h-24 w-24 text-red-700 dark:text-red-300 inline'/>
                    <span className='pl-2 text-red-700 dark:text-red-300 font-bold text-xl'>
                        {reduxState.translations.translations['anonymousFileupload.resultInfected']}
                    </span>
                    <div className='mt-10 text-black dark:text-white'>
                        {reduxState.translations.translations['anonymousFileupload.resultInfectedInfo']}
                        <br/>
                        <span className='font-bold'>
                            {reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avSignature.replace(' FOUND', '')}
                        </span>
                    </div>
                </div>
            </ContentParagraph>
        }
    </>;
};

export default FileCheckSlotStatusInfoUpdater;
