import React from 'react';
import { useAppSelector } from '../../app/hooks';
import MainContentStart from '../../elements/MainContentStart';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import FileCheckSlotCreator from './FileCheckSlotCreator';
import UploadWidget from './UploadWidget';
import MainHeadline from '../../elements/MainHeadline';
import FileCheckSlotStatusInfoUpdater from './FileCheckSlotStatusInfoUpdater';

const Uploader = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                <MainHeadline>
                    { reduxState.translations.translations['anonymousFileupload.headline'] }
                </MainHeadline>
                <FileCheckSlotCreator/>
                <FileCheckSlotStatusInfoUpdater/>
                {
                    reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo !== null
                    &&
                    <UploadWidget />
                }

                <pre>{ JSON.stringify(reduxState.anonymousFileupload.fileCheckSlotStatusInfo, null, 2) }</pre>
            </MainContentStart>
        </MainContent>
    </>;
};

export default Uploader;
