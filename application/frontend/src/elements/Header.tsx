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

    const navItems = [
        { to: ERoutes.login, text: reduxState.translations.translations['nav.link.login'] },
        { to: ERoutes.register, text: reduxState.translations.translations['nav.link.registration'] }
    ];

    const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

    return <header>
        <nav className='min-h-full bg-gray-800'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16 flex-shrink-0'>
                    <strong>virusaas</strong>
                </div>

                <div className='ml-0 flex items-baseline space-x-2'>
                    { navItems.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={
                                classNames(
                                reduxState.router.location.pathname === item.to
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium'
                                )
                            }
                        >
                            { item.text }
                        </Link>

                    )) }
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
        </nav>
        <div id='border-under-nav'>
            &nbsp;
        </div>
    </header>
};

export default Header;
