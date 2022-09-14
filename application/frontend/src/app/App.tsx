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
                    <div className='bg-gray-800 p-5 text-gray-600 text-right pr-8'>
                        <div>
                            <div className='mb-3'>
                                <span className='font-bold'>viruSaas</span>
                                &nbsp;·
                                virus checks as a service
                            </div>

                            <a href='https://www.patreon.com/manuelkiessling' target='_blank' rel='noreferrer' className='text-gray-400 ml-8'>
                                Patreon
                            </a>

                            <a href='https://github.com/hygieia-saas/hygieia-webapp' target='_blank' rel='noreferrer' className='text-gray-400 ml-8'>
                                Source Code
                            </a>

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
