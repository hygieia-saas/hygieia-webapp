import React from 'react';
import { useAppSelector } from '../../app/hooks';
import MainContentStart from '../../elements/MainContentStart';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import PresignedPostReceiver from './PresignedPostRetriever';
import UploadWidget from './UploadWidget';

const Uploader = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
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
