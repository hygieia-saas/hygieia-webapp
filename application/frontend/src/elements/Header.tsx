import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ERoutes from '../app/routes';
import { EIso639_1LanguageCodes, switchToLanguageCommand } from '../app/translationsSlice';
import { logOutOfAccountCommand } from '../features/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Header = (): JSX.Element => {

    const reduxState = useAppSelector(state => state);
    const reduxDispatch = useAppDispatch();

    const [showLogoutCta, setShowLogoutCta] = useState(false);

    return <header>
        <div>
            <div>
                <div>
                    <strong>virusaas</strong>
                </div>

                <div>
                    { reduxState.translations.translations['nav.toggle.text'] }
                    ☰
                </div>
                <div
                    id='responsive-navbar-nav'
                >
                    <div>

                        {
                            reduxState.session.isLoggedIn
                            ||
                            <>
                                <Link to={ERoutes.login}>
                                    { reduxState.translations.translations['nav.link.login'] }
                                </Link>

                                <Link to={ERoutes.register}>
                                    { reduxState.translations.translations['nav.link.registration'] }
                                </Link>
                            </>
                        }

                    </div>

                    <div>

                        <div
                            id='language-selection-dropdown'
                        >
                            <button
                                onClick={() => reduxDispatch(switchToLanguageCommand(EIso639_1LanguageCodes.en))}
                            >English</button>

                            <button
                                onClick={() => reduxDispatch(switchToLanguageCommand(EIso639_1LanguageCodes.de))}
                            >Deutsch</button>
                        </div>

                        {
                            reduxState.session.isLoggedIn
                            &&
                            <div data-testid='nav.loggedinUserBadge'>
                                {
                                    showLogoutCta
                                    ||
                                    <>
                                        <button
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
                                        </button>
                                    </>
                                }
                                {
                                    showLogoutCta
                                    &&
                                    <>
                                        <button
                                            onClick={() => reduxDispatch(logOutOfAccountCommand())}
                                        >
                                            <span id='logged-in-user-badge-logout-text'>
                                                { reduxState.translations.translations['nav.loggedinUserBadge.logoutCta'] }
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div id='border-under-nav'>
            &nbsp;
        </div>
    </header>
};

export default Header;
