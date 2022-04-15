import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { MenuIcon, XIcon, UserIcon, TranslateIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import ERoutes from '../app/routes';
import { EIso639_1LanguageCodes, switchToLanguageCommand } from '../app/translationsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleDarkModeCommand } from '../app/uiSettingsSlice';

const Header = (): JSX.Element => {

    const reduxState = useAppSelector(state => state);
    const reduxDispatch = useAppDispatch();
    const location = useLocation();

    const navigation: { href: string, name: string }[] = [];

    if (!reduxState.session.isLoggedIn) {
        navigation.push({ href: ERoutes.login, name: reduxState.translations.translations['nav.link.login'] });
        navigation.push({ href: ERoutes.register, name: reduxState.translations.translations['nav.link.registration'] });
    }

    const userNavigation = [
        { name: 'Settings', href: '#' },
        { name: 'Sign out', href: '#' },
    ];

    const languages = [
        { name: 'English', code: EIso639_1LanguageCodes.en },
        { name: 'Deutsch', code: EIso639_1LanguageCodes.de }
    ];

    const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

    return <>
        <div className='min-h-full'>
            <Disclosure as='nav' className='bg-gray-800'>
                {({ open }) => (
                    <>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                            <div className='flex items-center justify-between h-16'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 text-lime-500 font-black'>
                                        viruSaas
                                    </div>
                                    <div className='hidden md:block'>
                                        <div className='ml-10 flex items-baseline space-x-4'>
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname === item.href ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden md:block'>
                                    <div className='ml-4 flex items-center md:ml-6'>

                                        <button
                                            className='h-6 w-6 mr-4 text-gray-400'
                                            onClick={() => reduxDispatch(toggleDarkModeCommand())}
                                        >
                                            { reduxState.uiSettings.darkMode && <MoonIcon className='text-indigo-700'/> }
                                            { reduxState.uiSettings.darkMode || <SunIcon className='text-amber-600'/> }
                                        </button>

                                        {/* Language dropdown */}
                                        <Menu as='div' className='mr-4 relative'>
                                            <div>
                                                <Menu.Button className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none'>
                                                    <span className='sr-only'>Open translation menu</span>
                                                    <TranslateIcon className='h-6 w-6 text-gray-400'/>
                                                </Menu.Button>
                                            </div>
                                            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                {languages.map((item) => (
                                                    <Menu.Item key={item.code}>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => reduxDispatch(switchToLanguageCommand(item.code))}
                                                                className={classNames(
                                                                    active ? 'bg-gray-700' : '',
                                                                    'block px-4 py-2 text-sm text-gray-300 w-full text-left hover:text-white'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Menu>
                                    </div>
                                </div>
                                <div className='-mr-2 flex md:hidden'>
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                        <span className='sr-only'>Open main menu</span>
                                        {open ? (
                                            <XIcon className='block h-6 w-6' aria-hidden='true' />
                                        ) : (
                                            <>
                                                {reduxState.translations.translations['nav.toggle.text']}
                                                <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                                            </>
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className='md:hidden'>
                            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as={Link}
                                        to={item.href}
                                        className={classNames(
                                            location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={location.pathname === item.href ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className='pt-3 pb-3 border-t border-gray-700 px-2 space-y-1 sm:px-3'>
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as={Link}
                                        to={item.href}
                                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className='pt-3 pb-3 border-t border-gray-700 px-2 space-y-1 sm:px-3'>
                                {languages.map((item) => (
                                    <button
                                        key={item.name}
                                        className='block w-full px-3 py-2 rounded-md text-base text-left font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                                        onClick={() => reduxDispatch(switchToLanguageCommand(item.code))}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                            <div className='pt-3 pb-3 border-t border-gray-700 px-2 space-y-1 sm:px-3'>
                                <button
                                    className='ml-3 h-6 w-6 text-gray-400'
                                    onClick={() => reduxDispatch(toggleDarkModeCommand())}
                                >
                                    { reduxState.uiSettings.darkMode && <MoonIcon className='text-indigo-700'/> }
                                    { reduxState.uiSettings.darkMode || <SunIcon className='text-amber-600'/> }
                                </button>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    </>
};

export default Header;
