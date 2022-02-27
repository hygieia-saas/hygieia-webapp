import React from 'react';
import { useAppSelector } from '../../app/hooks';
import MainContentStart from '../../elements/MainContentStart';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import PresignedPostReceiver from './PresignedPostRetriever';
import UploadWidget from './UploadWidget';
import MainHeadline from '../../elements/MainHeadline';

const Uploader = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                <MainHeadline>
                    { reduxState.translations.translations['anonymousFileupload.headline'] }
                </MainHeadline>
                <PresignedPostReceiver/>
                {
                    reduxState.anonymousFileupload.presignedPost !== null
                    &&
                    <UploadWidget />
                }
            </MainContentStart>
        </MainContent>
    </>;
};

export default Uploader;
