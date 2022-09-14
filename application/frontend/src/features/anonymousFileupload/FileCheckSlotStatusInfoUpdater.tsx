import React from 'react';
import { BadgeCheckIcon, XCircleIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    startRepeatedlyGetFileCheckSlotStatusInfo
} from './anonymousFileuploadSlice';
import Spinner from '../../elements/Spinner';
import ContentBlock from '../../elements/ContentBlock';

const FileCheckSlotStatusInfoUpdater = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    if (   reduxState.anonymousFileupload.uploadFinishedSuccessfully
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
                && (reduxState.anonymousFileupload.fileCheckSlotStatusInfo === null
                || reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avStatus === "unknown")
            )
            &&
            <ContentBlock>
                <Spinner text={reduxState.translations.translations['anonymousFileupload.waitingForResult']}/>
            </ContentBlock>
        }

        {
            (      reduxState.anonymousFileupload.uploadFinishedSuccessfully
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo !== null
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avStatus === "clean"
            )
            &&
            <ContentBlock>
                <div className='mt-10 bg-green-100 dark:bg-green-900 rounded-lg p-8'>
                    <BadgeCheckIcon className='h-12 w-12 text-green-700 dark:text-green-300 inline'/>
                    <span className='pl-2 text-green-700 dark:text-green-300 font-bold text-xl'>
                        {reduxState.translations.translations['anonymousFileupload.resultClean']}
                    </span>
                    <div className='mt-10 text-black dark:text-white'>
                        {reduxState.translations.translations['anonymousFileupload.resultCleanInfo']}
                    </div>
                    <div className='mt-10 text-black dark:text-white'>
                        <a className='underline' href='/upload'>
                            {reduxState.translations.translations['anonymousFileupload.checkAnotherFileCta']}
                        </a>
                    </div>
                </div>
            </ContentBlock>
        }

        {
            (      reduxState.anonymousFileupload.uploadFinishedSuccessfully
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo !== null
                && reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avStatus === "infected"
            )
            &&
            <ContentBlock>
                <div className='mt-10 bg-red-100 dark:bg-red-900 rounded-lg p-8'>
                    <XCircleIcon className='h-12 w-12 text-red-700 dark:text-red-300 inline'/>
                    <span className='pl-2 text-red-700 dark:text-red-300 font-bold text-xl'>
                        {reduxState.translations.translations['anonymousFileupload.resultInfected']}
                    </span>
                    <div className='mt-10 text-black dark:text-white'>
                        {reduxState.translations.translations['anonymousFileupload.resultInfectedInfo']}
                        <br/>
                        <span className='font-bold'>
                            <a rel='noreferrer'
                                href={'https://www.trendmicro.com/vinfo/us/threat-encyclopedia/search/' + encodeURI(reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avSignature.replace(' FOUND', ''))} target='_blank'
                            >
                                {reduxState.anonymousFileupload.fileCheckSlotStatusInfo.avSignature.replace(' FOUND', '')}
                            </a>
                        </span>
                    </div>
                    <div className='mt-10 text-black dark:text-white'>
                        <a className='underline' href='/upload' rel='noreferrer'>
                            {reduxState.translations.translations['anonymousFileupload.checkAnotherFileCta']}
                        </a>
                    </div>
                </div>
            </ContentBlock>
        }
    </>;
};

export default FileCheckSlotStatusInfoUpdater;
