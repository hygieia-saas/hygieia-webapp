import React from 'react';
import './app.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ERoutes from './routes';
import ScrollToTopWrapper from '../elements/ScrollToTopWrapper';
import { useAppSelector } from './hooks';
import Uploader from '../features/anonymousFileupload/Uploader';
import Imprint from '../features/content/Imprint';

const App = (): JSX.Element => {

    const reduxState = useAppSelector(state => state);

    return (
        <div className={reduxState.uiSettings.darkMode ? 'dark' : ''}>
            <ScrollToTopWrapper>
                <Routes>
                    <Route path={ERoutes['home']} element={
                        <Navigate to={ERoutes['upload']}/>
                    } />

                    <Route path={ERoutes['imprint']} element={<Imprint/>} />

                    <Route path={ERoutes['upload']} element={<Uploader/>} />
                </Routes>


                <footer className='pt-64 bg-gray-100 dark:bg-gray-900'>
                    <div className='m-0 p-0'>
                        <div className='
                                bottom-0
                                left-0
                                m-0
                                flex
                                justify-start
                            '>
                                <div className='
                                        max-w-lg
                                        bg-lime-800
                                        p-6
                                        text-gray-300
                                        text-md
                                        text-left
                                        rounded-tr-2xl
                                '>
                                    <p className='max-w-lg'>
                                        { reduxState.translations.translations['claim.maintext'] }
                                    </p>

                                    <p className='mt-4 w-1/2'>
                                        <button className='block rounded-md bg-lime-400 p-2 text-xs text-black'>
                                            { reduxState.translations.translations['claim.cta'] }
                                        </button>
                                    </p>
                                </div>
                        </div>
                    </div>

                    <div className='bg-gray-800 p-5 text-gray-600 text-right pr-8'>
                        <div>
                            <span className='font-bold'>viruSaas</span>
                            &nbsp;·
                            virus checks as a service

                            <Link to={ERoutes['imprint']} className='text-gray-400 ml-8'>
                                { reduxState.translations.translations['nav.link.imprint'] }
                            </Link>
                        </div>
                    </div>
                </footer>

            </ScrollToTopWrapper>
        </div>
    );
};

export default App;
