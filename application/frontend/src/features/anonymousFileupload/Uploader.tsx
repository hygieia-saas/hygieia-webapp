import React from 'react';
import { useAppSelector } from '../../app/hooks';
import MainContentStart from '../../elements/MainContentStart';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import PresignedUrlReceiver from './PresignedUrlRetriever';
import UploadWidget from './UploadWidget';

const Uploader = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                <PresignedUrlReceiver/>
                {
                    reduxState.anonymousFileupload.presignedUrl !== null
                    &&
                    <UploadWidget />
                }
            </MainContentStart>
        </MainContent>
    </>;
};

export default Uploader;
