import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MainContentStart from '../../elements/MainContentStart';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import PresignedUrlReceiver from './PresignedUrlRetriever';

const UploadForm = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                <PresignedUrlReceiver/>
            </MainContentStart>
        </MainContent>
    </>;
};

export default UploadForm;
