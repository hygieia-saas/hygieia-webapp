import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { MenuIcon, XIcon, TranslateIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import { EIso639_1LanguageCodes, switchToLanguageCommand } from '../app/translationsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleDarkModeCommand } from '../app/uiSettingsSlice';
import ERoutes from '../app/routes';

const Header = (): JSX.Element => {

    const reduxState = useAppSelector(state => state);
    const reduxDispatch = useAppDispatch();

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
                                        <Link to={ERoutes['upload']}>
                                            viruSaas
                                        </Link>
                                    </div>
                                </div>
                                <div className='block'>
                                    <div className='ml-4 flex items-center md:ml-6'>

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

                                        <button
                                            className='h-6 w-6 mr-4 text-gray-400'
                                            onClick={() => reduxDispatch(toggleDarkModeCommand())}
                                        >
                                            { reduxState.uiSettings.darkMode && <MoonIcon className='text-indigo-700'/> }
                                            { reduxState.uiSettings.darkMode || <SunIcon className='text-amber-600'/> }
                                        </button>

                                    </div>
                                </div>
                                <div className='-mr-2 flex hidden'>
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
