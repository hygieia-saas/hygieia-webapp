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
    readonly 'nav.link.formDefinitions': string
    readonly 'nav.link.inquiries': string

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

    readonly 'formDefinitions.overview.noFormDefinitionsYet.note': string
    readonly 'formDefinitions.overview.noFormDefinitionsYet.explanation1': string
    readonly 'formDefinitions.overview.noFormDefinitionsYet.explanation2': string
    readonly 'formDefinitions.overview.noFormDefinitionsYet.createNewCta': string
    readonly 'formDefinitions.overview.createNewCta': string
    readonly 'formDefinition.summary.question': string
    readonly 'formDefinition.summary.questions': string
    readonly 'formDefinition.summary.editCta': string
    readonly 'formDefinition.summary.showCta': string

    readonly 'formDefinition.createDialog.headline': string
    readonly 'formDefinition.createDialog.titlePlaceholder': string
    readonly 'formDefinition.createDialog.cta': string
    readonly 'formDefinition.createDialog.ctaProcessing': string
    readonly 'formDefinition.createDialog.error.idBelongsToDifferentUser': string

    readonly 'formDefinition.editDialog.goBackCta': string
    readonly 'formDefinition.editDialog.explanation': string
    readonly 'formDefinition.editDialog.addQuestionCta': string
    readonly 'formDefinition.editDialog.dragInfo': string

    readonly 'formQueryDefinition.editDialog.textPlaceholder': string

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
        'nav.link.formDefinitions': 'Formulare',
        'nav.link.inquiries': 'Anfragen',

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

        'formDefinitions.overview.noFormDefinitionsYet.note': 'Es wurden noch keine Anfrageformulare angelegt.',
        'formDefinitions.overview.noFormDefinitionsYet.explanation1': 'Ein Anfrageformular ist eine Liste von Fragen die Interessenten beantworten müssen, bevor sie in einen Video-Call mit Ihren Mitarbeitenden gelangen können.',
        'formDefinitions.overview.noFormDefinitionsYet.explanation2': 'Die in einem Anfrageformular gestellten Fragen können von Ihnen frei definiert werden.',
        'formDefinitions.overview.noFormDefinitionsYet.createNewCta': 'Ein Anfrageformular anlegen',
        'formDefinitions.overview.createNewCta': 'Ein weiteres Anfrageformular anlegen',

        'formDefinition.summary.question': 'Frage',
        'formDefinition.summary.questions': 'Fragen',
        'formDefinition.summary.editCta': 'Bearbeiten',
        'formDefinition.summary.showCta': 'Anzeigen',

        'formDefinition.createDialog.headline': 'Ein neues Anfrageformular anlegen',
        'formDefinition.createDialog.titlePlaceholder': 'Titel des neuen Formulars',
        'formDefinition.createDialog.cta': 'Anlegen',
        'formDefinition.createDialog.ctaProcessing': 'Wird angelegt...',
        'formDefinition.createDialog.error.idBelongsToDifferentUser': 'Ein Zuordnungsfehler ist aufgetreten.',

        'formDefinition.editDialog.goBackCta': 'Zurück zur Übersicht aller Formulare',
        'formDefinition.editDialog.explanation': 'Verwenden Sie den untenstehenden Editor, um die Fragen des Formulars „%title%” zu definieren.',
        'formDefinition.editDialog.addQuestionCta': 'Frage hinzufügen',
        'formDefinition.editDialog.dragInfo': 'Ziehen Sie die Fragen über das ═ Feld an eine andere Position in der Liste.',

        'formQueryDefinition.editDialog.textPlaceholder': 'Text für Frage #%index%',

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
        'nav.link.formDefinitions': 'Forms',
        'nav.link.inquiries': 'Inquiries',

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

        'formDefinitions.overview.noFormDefinitionsYet.note': 'No inquiry forms defined yet.',
        'formDefinitions.overview.noFormDefinitionsYet.explanation1': 'An inquiry form is a list of questions which your users need to answer before they can join a video call with one of your agents.',
        'formDefinitions.overview.noFormDefinitionsYet.explanation2': 'The questions asked within the inquiry form can be freely defined.',
        'formDefinitions.overview.noFormDefinitionsYet.createNewCta': 'Create inquiry form',
        'formDefinitions.overview.createNewCta': 'Create another inquiry form',

        'formDefinition.summary.question': 'Question',
        'formDefinition.summary.questions': 'Questions',
        'formDefinition.summary.editCta': 'Edit',
        'formDefinition.summary.showCta': 'Show',

        'formDefinition.createDialog.headline': 'Create a new inquiry form',
        'formDefinition.createDialog.titlePlaceholder': 'Title of new form',
        'formDefinition.createDialog.cta': 'Create',
        'formDefinition.createDialog.ctaProcessing': 'Creating...',
        'formDefinition.createDialog.error.idBelongsToDifferentUser': 'An association error occured.',

        'formDefinition.editDialog.goBackCta': 'Go back to the forms overview',
        'formDefinition.editDialog.explanation': 'Use the editor below to define the questions of inquiry form „%title%”.',
        'formDefinition.editDialog.addQuestionCta': 'Add question',
        'formDefinition.editDialog.dragInfo': 'Drag the ═ handle to move a question to another position in the list.',

        'formQueryDefinition.editDialog.textPlaceholder': 'Text for question #%index%',

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
                 sameSite: 'lax',
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
