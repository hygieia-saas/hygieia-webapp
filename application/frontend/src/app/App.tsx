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

const App = (): JSX.Element => {

    return (
        <ScrollToTopWrapper>
            <Routes>
                <Route path={ERoutes['login']} element={<Login/>} />
                <Route path={ERoutes['register']} element={<Registration/>} />

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

            <footer>
                <div>
                    <div>
                        <div>
                            <Link to={ERoutes.imprint}>Imprint</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </ScrollToTopWrapper>
    );
};

export default App;
