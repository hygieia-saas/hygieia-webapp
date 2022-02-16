import React from 'react';
import Registration from '../features/session/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss'
import { NavLink, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Login from '../features/session/Login';
import ERoutes from './routes';
import Header from '../elements/Header';
import MainContent from '../elements/MainContent';
import MainContentStart from '../elements/MainContentStart';

const App = (): JSX.Element => {

    return (
        <>
            <Switch>
                <Route path={ERoutes['login']}><Login/></Route>
                <Route path={ERoutes['register']}><Registration/></Route>

                <Route path={ERoutes['home']}>
                    <Header/>
                    <MainContent>
                        <MainContentStart>
                            <h1>Home</h1>
                        </MainContentStart>
                    </MainContent>
                </Route>
            </Switch>

            <footer>
                <Navbar bg='dark' variant='dark'>
                    <Container>
                        <Nav>
                            <Nav.Link as={NavLink} to={ERoutes.imprint}>Imprint</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </footer>
        </>
    );
};

export default App;
