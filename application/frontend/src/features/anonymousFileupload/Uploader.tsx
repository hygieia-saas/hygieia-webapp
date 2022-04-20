import React from 'react';
import { useAppSelector } from '../../app/hooks';
import MainContentStart from '../../elements/MainContentStart';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import FileCheckSlotCreator from './FileCheckSlotCreator';
import UploadWidget from './UploadWidget';
import MainHeadline from '../../elements/MainHeadline';
import FileCheckSlotStatusInfoUpdater from './FileCheckSlotStatusInfoUpdater';
import ContentBlock from '../../elements/ContentBlock';
import Spinner from '../../elements/Spinner';
import ErrorMessage from '../../elements/ErrorMessage';

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
                    (
                        reduxState.anonymousFileupload.fileCheckSlotPresignedPostInfo !== null
                        && !reduxState.anonymousFileupload.uploadStarted
                    )
                    &&
                    <UploadWidget />
                }

                {
                    (
                        reduxState.anonymousFileupload.uploadStarted
                        && !reduxState.anonymousFileupload.uploadFinishedSuccessfully
                        && !reduxState.anonymousFileupload.uploadErrored
                    )
                    &&
                    <ContentBlock>
                        <Spinner text={reduxState.translations.translations['anonymousFileupload.uploading']}/>
                        <p className='text-xl mt-5 font-black'>
                            {reduxState.anonymousFileupload.uploadProgress}%
                        </p>
                    </ContentBlock>
                }

                {
                    (
                        reduxState.anonymousFileupload.uploadStarted
                        && reduxState.anonymousFileupload.uploadErrored
                    )
                    &&
                    <ContentBlock>
                        <ErrorMessage message={reduxState.translations.translations['anonymousFileupload.uploading']}/>
                    </ContentBlock>
                }
            </MainContentStart>
        </MainContent>
    </>;
};

export default Uploader;
