import React from 'react';
import { useAppSelector } from '../../app/hooks';
import MainContentStart from '../../elements/MainContentStart';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import FileCheckSlotCreator from './FileCheckSlotCreator';
import UploadWidget from './UploadWidget';
import MainHeadline from '../../elements/MainHeadline';
import FileCheckSlotStatusInfoUpdater from './FileCheckSlotStatusInfoUpdater';
import ContentParagraph from '../../elements/ContentParagraph';
import Spinner from '../../elements/Spinner';

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
                    )
                    &&
                    <ContentParagraph>
                        <Spinner text={reduxState.translations.translations['anonymousFileupload.uploading']}/>
                        <div className='text-xl mt-5 font-black'>
                            {reduxState.anonymousFileupload.uploadProgress}%
                        </div>
                    </ContentParagraph>
                }
            </MainContentStart>
        </MainContent>
    </>;
};

export default Uploader;
