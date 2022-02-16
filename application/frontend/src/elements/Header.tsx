import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ERoutes from '../app/routes';
import { EIso639_1LanguageCodes, switchToLanguageCommand } from '../app/translationsSlice';
import { logOutOfAccountCommand } from '../features/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Header = (): JSX.Element => {

    const reduxState = useAppSelector(state => state);
    const reduxDispatch = useAppDispatch();

    const [showLogoutCta, setShowLogoutCta] = useState(false);

    return <header>
        <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
            <Container fluid className='ms-3 me-3'>
                <Navbar.Brand>
                    <strong>vid<ChatQuote/>Inquiry</strong>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls='responsive-navbar-nav'
                    label={ reduxState.translations.translations['nav.toggle.label'] }
                >
                    { reduxState.translations.translations['nav.toggle.text'] }
                    ☰
                </Navbar.Toggle>
                <Navbar.Collapse
                    id='responsive-navbar-nav'
                >
                    <Nav className='me-auto' variant='pills'>

                        {
                            reduxState.session.isLoggedIn
                            &&
                            <>
                                <Nav.Link
                                    as={NavLink}
                                    to={ERoutes['formDefinitions.overview']}
                                    data-testid='nav.link.formDefinitions'
                                >
                                    { reduxState.translations.translations['nav.link.formDefinitions'] }
                                </Nav.Link>

                                <Nav.Link as={NavLink} to={ERoutes['inquiries.overview']}>
                                    { reduxState.translations.translations['nav.link.inquiries'] }
                                </Nav.Link>
                            </>
                        }

                        {
                            reduxState.session.isLoggedIn
                            ||
                            <>
                                <Nav.Link as={NavLink} to={ERoutes.login}>
                                    { reduxState.translations.translations['nav.link.login'] }
                                </Nav.Link>

                                <Nav.Link as={NavLink} to={ERoutes.register}>
                                    { reduxState.translations.translations['nav.link.registration'] }
                                </Nav.Link>
                            </>
                        }

                    </Nav>

                    <Nav>

                        <NavDropdown
                            title={
                                <>
                                    {EIso639_1LanguageCodes.en.toUpperCase()}
                                    &nbsp;
                                    {EIso639_1LanguageCodes.de.toUpperCase()}
                                    &nbsp;
                                    <Translate id='language-dropdown-icon' />
                                </>
                            }
                            id='language-selection-dropdown'
                        >
                            <NavDropdown.Item
                                onClick={() => reduxDispatch(switchToLanguageCommand(EIso639_1LanguageCodes.en))}
                            >English</NavDropdown.Item>

                            <NavDropdown.Item
                                onClick={() => reduxDispatch(switchToLanguageCommand(EIso639_1LanguageCodes.de))}
                            >Deutsch</NavDropdown.Item>
                        </NavDropdown>

                        {
                            reduxState.session.isLoggedIn
                            &&
                            <div data-testid='nav.loggedinUserBadge'>
                                {
                                    showLogoutCta
                                    ||
                                    <>
                                        <Nav.Link
                                            data-testid='nav.loggedinUserBadge'
                                            onClick={
                                                () => {
                                                    setShowLogoutCta(true);
                                                    setTimeout(() => setShowLogoutCta(false), 5000);
                                                }
                                            }
                                        >
                                                    <span id='logged-in-user-badge-name'>
                                                        {reduxState.session.loggedInEmail}
                                                    </span>
                                            &nbsp;
                                            <PersonSquare id='loggedin-user-badge-icon'/>
                                        </Nav.Link>
                                    </>
                                }
                                {
                                    showLogoutCta
                                    &&
                                    <>
                                        <Nav.Link
                                            onClick={() => reduxDispatch(logOutOfAccountCommand())}
                                        >
                                                    <span id='logged-in-user-badge-logout-text'>
                                                        { reduxState.translations.translations['nav.loggedinUserBadge.logoutCta'] }
                                                    </span>
                                            &nbsp;
                                            <BoxArrowRight id='loggedin-user-badge-logout-icon'/>
                                        </Nav.Link>
                                    </>
                                }
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container fluid id='border-under-nav'>
            &nbsp;
        </Container>
    </header>
};

export default Header;
