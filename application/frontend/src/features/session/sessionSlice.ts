import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { defaultRestApiFetch } from '../../app/util';
import { IOperation, RootState } from '../../app/store';
import { ICredentials, restApiDefaultRoutes } from 'hygieia-webapp-shared';
import config from '../../app/config';
import { ERestApiDefaultRouteNames } from 'hygieia-webapp-shared/build/routes/restApiDefaultRoutes';

export interface ISessionState {
    readonly isAnonymous: boolean,
    readonly isLoggedIn: boolean,
    readonly loggedInEmail: null | string,
    readonly defaultRestApiKeyId: null | string,
    readonly recaptchaResponseKey: null | string,
    readonly registrationOperation: IOperation,
    readonly loginOperation: IOperation
}

export const initialState: ISessionState = {
    isAnonymous: false,
    isLoggedIn: false,
    loggedInEmail: null,
    defaultRestApiKeyId: null,
    recaptchaResponseKey: null,
    registrationOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    },
    loginOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    }
};


export const registerAccountCommand = createAsyncThunk<void, ICredentials, { state: RootState, rejectValue: string }>(
    'session/registerAccount',
    async (arg, thunkAPI) => {

        return await defaultRestApiFetch(
            restApiDefaultRoutes[ERestApiDefaultRouteNames.registerUser].pathPattern.stringify(),
            restApiDefaultRoutes[ERestApiDefaultRouteNames.registerUser].verb,
            null,
            JSON.stringify({ email: arg.email, password: arg.password })
        )
            .then(response => {
                console.debug(response);
                if (response.status === 201) {
                    return;
                } else if (response.status === 400) {
                    throw new Error(thunkAPI.getState().translations.translations['session.registration.error.userAlreadyExists']);
                } else {
                    throw new Error(thunkAPI.getState().translations.translations['apiError.unexpectedResponse'].replace('%code%', response.status.toString()));
                }
            })

            .catch((error) => {
                console.error(error);
                if (error instanceof Error) {
                    return thunkAPI.rejectWithValue(error.message);
                } else {
                    return thunkAPI.rejectWithValue(error as string);
                }
            });
    }
);


export const logIntoAccountCommand = createAsyncThunk<{ defaultRestApiKeyId: string, email: string }, ICredentials, { state: RootState, rejectValue: string }>(
    'session/logIntoAccount',
    async (arg, thunkAPI) => {

        return await defaultRestApiFetch(
            restApiDefaultRoutes[ERestApiDefaultRouteNames.createApiKey].pathPattern.stringify(),
            restApiDefaultRoutes[ERestApiDefaultRouteNames.createApiKey].verb,
            null,
            JSON.stringify({ email: arg.email, password: arg.password })
        )
            .then(response => {
                console.debug(response);
                if (response.status === 201) {
                    return response.json() as Promise<string>;
                } else if (response.status === 403) {
                    throw new Error(thunkAPI.getState().translations.translations['session.login.error.invalidCredentials']);
                } else if (response.status === 404) {
                    throw new Error(thunkAPI.getState().translations.translations['session.login.error.userNotFound']);
                } else {
                    throw new Error(thunkAPI.getState().translations.translations['apiError.unexpectedResponse'].replace('%code%', response.status.toString()));
                }
            })

            .then(parsedResponseContent => {
                const cookies = new Cookies();
                cookies.set(
                    'loggedInEmail',
                    arg.email,
                    {
                        path: '/',
                        sameSite: 'strict',
                        secure: true,
                        expires: new Date(new Date().getTime() + config.cookieDurationInMilliseconds)
                    }
                );
                cookies.set(
                    'defaultRestApiKeyId',
                    parsedResponseContent,
                    {
                        path: '/',
                        sameSite: 'strict',
                        secure: true,
                        expires: new Date(new Date().getTime() + config.cookieDurationInMilliseconds)
                    }
                );
                return { defaultRestApiKeyId: parsedResponseContent, email: arg.email };
            })

            .catch((error: Error) => {
                console.error(error);
                return thunkAPI.rejectWithValue(error.message);
            });
    }
);


export const logOutOfAccountCommand = createAsyncThunk(
    'session/logOutOfAccount',
    () => {
        const cookies = new Cookies();

        cookies.set(
            'loggedInEmail',
            '',
            {
                path: '/',
                sameSite: 'strict',
                secure: true,
                expires: new Date(new Date().getTime() - config.cookieDurationInMilliseconds)
            }
        );

        cookies.set(
            'defaultRestApiKeyId',
            '',
            {
                path: '/',
                sameSite: 'strict',
                secure: true,
                expires: new Date(new Date().getTime() - config.cookieDurationInMilliseconds)
            }
        );

        return;
    }
);


export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setRecaptchaValue: (state, action: PayloadAction<ISessionState['recaptchaResponseKey']>) => {
            state.recaptchaResponseKey = action.payload;
        },
    },
    extraReducers: (builder => {
        builder.addCase(registerAccountCommand.pending, state => {
            state.registrationOperation.justFinishedSuccessfully = false;
            state.registrationOperation.isRunning = true;
            state.registrationOperation.errorMessage = null;
        });

        builder.addCase(registerAccountCommand.rejected, (state, action) => {
            state.registrationOperation.justFinishedSuccessfully = false;
            state.registrationOperation.isRunning = false;
            state.registrationOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(registerAccountCommand.fulfilled, state => {
            state.registrationOperation.justFinishedSuccessfully = true;
            state.registrationOperation.isRunning = false;
            state.registrationOperation.errorMessage = null;
        });


        builder.addCase(logIntoAccountCommand.pending, state => {
            state.isLoggedIn = false;
            state.loginOperation.justFinishedSuccessfully = false;
            state.loginOperation.isRunning = true;
            state.loginOperation.errorMessage = null;
        });

        builder.addCase(logIntoAccountCommand.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.loginOperation.justFinishedSuccessfully = false;
            state.loginOperation.isRunning = false;
            state.loginOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(logIntoAccountCommand.fulfilled, (state, action) => {
            state.defaultRestApiKeyId = action.payload.defaultRestApiKeyId;
            state.loggedInEmail = action.payload.email;
            state.isLoggedIn = true;
            state.loginOperation.justFinishedSuccessfully = true;
            state.loginOperation.isRunning = false;
            state.loginOperation.errorMessage = null;
        });


        builder.addCase(logOutOfAccountCommand.fulfilled, () => {
            return initialState;
        })
    })
});
