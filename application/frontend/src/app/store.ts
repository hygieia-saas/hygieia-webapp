import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import history from './history';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { translations, EIso639_1LanguageCodes, translationsSlice } from './translationsSlice';
import { initialState as sessionInitialState, sessionSlice } from '../features/session/sessionSlice';

let preloadIsLoggedIn = sessionInitialState.isLoggedIn;
let preloadLoggedInEmail = sessionInitialState.loggedInEmail;
let preloadDefaultRestApiKeyId = sessionInitialState.defaultRestApiKeyId;

const cookies = new Cookies();
const loggedInEmailCookie = cookies.get('loggedInEmail') as string;
const defaultRestApiKeyIdCookie = cookies.get('defaultRestApiKeyId') as string;
if (   loggedInEmailCookie !== undefined
    && defaultRestApiKeyIdCookie !== undefined
) {
  preloadIsLoggedIn = true;
  preloadLoggedInEmail = loggedInEmailCookie;
  preloadDefaultRestApiKeyId = defaultRestApiKeyIdCookie;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let language: keyof typeof EIso639_1LanguageCodes = EIso639_1LanguageCodes.en;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const languageCookie = cookies.get('language');
if (languageCookie === undefined) {
  if (navigator.language.startsWith(`${EIso639_1LanguageCodes.en}-`)) {
    language = EIso639_1LanguageCodes.en;
  }
  if (navigator.language.startsWith(`${EIso639_1LanguageCodes.de}-`)) {
    language = EIso639_1LanguageCodes.de;
  }
} else {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-explicit-any
  if ((<any>Object).values(EIso639_1LanguageCodes).includes(languageCookie)) {
    language = languageCookie as keyof typeof EIso639_1LanguageCodes;
  }
}


export const store = configureStore({
  reducer: {
    translations: translationsSlice.reducer,
    session: sessionSlice.reducer,
    router: connectRouter(history)
  },
  preloadedState: {
    session: {
      ...sessionInitialState,
      isLoggedIn: preloadIsLoggedIn,
      loggedInEmail: preloadLoggedInEmail,
      defaultRestApiKeyId: preloadDefaultRestApiKeyId
    },
    translations: translations[language]
  },
  enhancers: [applyMiddleware(routerMiddleware(history))],
  devTools: true
});

export interface IOperation {
  readonly isRunning: boolean,
  readonly justFinishedSuccessfully: boolean,
  readonly errorMessage: null | string
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
