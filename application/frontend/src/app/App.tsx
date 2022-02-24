import React from 'react';
import Registration from '../features/session/Registration';
import './app.css'
import { Routes, Route, Link } from 'react-router-dom';
import Login from '../features/session/Login';
import ERoutes from './routes';
import Header from '../elements/Header';
import MainContent from '../elements/MainContent';
import MainContentStart from '../elements/MainContentStart';
import ScrollToTopWrapper from '../elements/ScrollToTopWrapper';
import { useAppSelector } from './hooks';
import Uploader from '../features/anonymousFileupload/Uploader';

const App = (): JSX.Element => {

    const reduxState = useAppSelector(state => state);

    return (
        <div className={reduxState.uiSettings.darkMode ? 'dark' : ''}>
            <ScrollToTopWrapper>
                <Routes>
                    <Route path={ERoutes['login']} element={<Login/>} />
                    <Route path={ERoutes['register']} element={<Registration/>} />

                    <Route path={ERoutes['upload']} element={<Uploader/>} />

                    <Route path={ERoutes['home']} element={
                        <>
                            <Header/>
                            <MainContent>
                                <MainContentStart>
                                    <h1>Home</h1>
                                </MainContentStart>
                            </MainContent>
                        </>
                    } />
                </Routes>

                <footer className='bg-gray-800 p-5 text-gray-600 text-right pr-8'>
                    <div>
                        <div>
                            <div>
                                <Link to={ERoutes.imprint}>Imprint</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </ScrollToTopWrapper>
        </div>
    );
};

export default App;
