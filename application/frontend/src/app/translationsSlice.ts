import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import config from './config';

export enum EIso639_1LanguageCodes {
    de = 'de',
    en = 'en'
}

export interface ITranslations {
    readonly 'general.pleaseWait': string
    readonly 'general.couldNotRetrieveData': string

    readonly 'nav.toggle.label': string
    readonly 'nav.toggle.text': string

    readonly 'nav.loggedinUserBadge.logoutCta': string,

    readonly 'nav.link.login': string
    readonly 'nav.link.registration': string

    readonly 'session.registration.headline': string
    readonly 'session.registration.email.placeholder': string
    readonly 'session.registration.password.placeholder': string
    readonly 'session.registration.cta': string
    readonly 'session.registration.ctaProcessing': string
    readonly 'session.registration.error.userAlreadyExists': string

    readonly 'session.login.headline': string
    readonly 'session.login.email.placeholder': string
    readonly 'session.login.password.placeholder': string
    readonly 'session.login.cta': string
    readonly 'session.login.ctaProcessing': string
    readonly 'session.login.error.userNotFound': string
    readonly 'session.login.error.invalidCredentials': string

    readonly 'syntacticalValidationRule.credentials.email.pattern': string
    readonly 'syntacticalValidationRule.credentials.password.required': string
    readonly 'syntacticalValidationRule.credentials.password.custom': string

    readonly 'apiError.unexpectedResponse': string
}

export interface ITranslationsState {
    readonly iso639_1LanguageCode: keyof typeof EIso639_1LanguageCodes
    readonly translations: ITranslations
}

const de: ITranslationsState = {
    iso639_1LanguageCode: EIso639_1LanguageCodes.de,
    translations: {
        'general.pleaseWait': 'Bitte warten...',
        'general.couldNotRetrieveData': 'Laden der Daten fehlgeschlagen.',

        'nav.toggle.label': 'Menü ausklappen',
        'nav.toggle.text': 'Menü',

        'nav.loggedinUserBadge.logoutCta': 'Klicken, um auszuloggen',

        'nav.link.login': 'Einloggen',
        'nav.link.registration': 'Registrieren',

        'session.registration.headline': 'Registrierung',
        'session.registration.email.placeholder': 'E-Mail',
        'session.registration.password.placeholder': 'Passwort',
        'session.registration.cta': 'Registrieren',
        'session.registration.ctaProcessing': 'Registrierung läuft...',
        'session.registration.error.userAlreadyExists': 'Es existiert bereits ein Benutzerkonto mit dieser E-Mailadresse.',

        'session.login.headline': 'Einloggen',
        'session.login.email.placeholder': 'E-Mail',
        'session.login.password.placeholder': 'Passwort',
        'session.login.cta': 'Einloggen',
        'session.login.ctaProcessing': 'Einloggen läuft...',
        'session.login.error.userNotFound': 'Ein Benutzerkonto mit dieser E-Mailadresse konnte nicht gefunden werden.',
        'session.login.error.invalidCredentials': 'Die angegebenen Zugangsdaten sind ungültig.',

        'syntacticalValidationRule.credentials.email.pattern': 'Bitte geben Sie eine gültige E-Mail Adresse ein.',
        'syntacticalValidationRule.credentials.password.required': 'Bitte geben Sie ein Paswort an.',
        'syntacticalValidationRule.credentials.password.custom': 'Das Passwort muss mindestens 6 Zeichen lang sein.',

        'apiError.unexpectedResponse': 'Unerwarteter Schnittstellenfehler (Code %code%).',
    }
};

const en: ITranslationsState = {
    iso639_1LanguageCode: EIso639_1LanguageCodes.en,
    translations: {
        'general.pleaseWait': 'Please wait...',
        'general.couldNotRetrieveData': 'Could not retrieve data.',

        'nav.toggle.label': 'Toggle menu',
        'nav.toggle.text': 'Navigation',

        'nav.loggedinUserBadge.logoutCta': 'Click again to log out',

        'nav.link.login': 'Login',
        'nav.link.registration': 'Registration',

        'session.registration.headline': 'Registration',
        'session.registration.email.placeholder': 'Email',
        'session.registration.password.placeholder': 'Password',
        'session.registration.cta': 'Register',
        'session.registration.ctaProcessing': 'Registration ongoing...',
        'session.registration.error.userAlreadyExists': 'A user account with this email address already exists.',

        'session.login.headline': 'Login',
        'session.login.email.placeholder': 'Email',
        'session.login.password.placeholder': 'Password',
        'session.login.cta': 'Log in',
        'session.login.ctaProcessing': 'Login ongoing...',
        'session.login.error.userNotFound': 'A user account with this email address could not be found.',

        'session.login.error.invalidCredentials': 'The provided credentials are invalid.',
        'syntacticalValidationRule.credentials.email.pattern': 'Please enter a valid e-mail address.',
        'syntacticalValidationRule.credentials.password.required': 'This field is required.',
        'syntacticalValidationRule.credentials.password.custom': 'The password needs to be at least 6 characters long.',

        'apiError.unexpectedResponse': 'Unexpected interface failure (code %code%).',
    }
};

export const translations = { de, en };

export const initialState: ITranslationsState = en;

export const switchToLanguageCommand = createAsyncThunk<keyof typeof EIso639_1LanguageCodes, keyof typeof EIso639_1LanguageCodes, { rejectValue: void }>(
    'translations/switchToLanguage',
     (arg) => {
         const cookies = new Cookies();
         cookies.set(
             'language',
             arg,
             {
                 path: '/',
                 sameSite: 'strict',
                 secure: true,
                 expires: new Date(new Date().getTime() + config.cookieDurationInMilliseconds)
             }
         );
         return arg;
     }
);


export const translationsSlice = createSlice({
    name: 'translations',
    initialState,

    reducers: {},

    extraReducers: builder => {
        builder.addCase(switchToLanguageCommand.fulfilled, (state, action) => {
            state.iso639_1LanguageCode = action.payload;
            state.translations = translations[action.payload].translations;
        });
    }
});
