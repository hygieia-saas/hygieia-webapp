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

                <footer className='bg-gray-800 p-5 text-gray-600 text-right pr-8'>
                    <div>
                        <div>
                            <div>
                                <Link to={ERoutes['imprint']}>
                                    { reduxState.translations.translations['nav.link.imprint'] }
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </ScrollToTopWrapper>
        </div>
    );
};

export default App;
