import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import config from './config';
import { RootState } from './store';

interface IUiSettingsState {
    darkMode: boolean
}

export const initialState: IUiSettingsState = { darkMode: true };

export const toggleDarkModeCommand = createAsyncThunk<boolean, void, { state: RootState, rejectValue: void }>(
    'uiSettings/toggleDarkMode',
     (arg, thunkApi) => {
         const cookies = new Cookies();
         cookies.set(
             'uiSettings.darkMode',
             !thunkApi.getState().uiSettings.darkMode,
             {
                 path: '/',
                 sameSite: 'lax',
                 secure: true,
                 expires: new Date(new Date().getTime() + config.cookieDurationInMilliseconds)
             }
         );
         return !thunkApi.getState().uiSettings.darkMode;
     }
);


export const uiSettingsSlice = createSlice({
    name: 'uiSettings',
    initialState,

    reducers: {},

    extraReducers: builder => {
        builder.addCase(toggleDarkModeCommand.fulfilled, (state, action) => {
            state.darkMode = action.payload;
        });
    }
});
