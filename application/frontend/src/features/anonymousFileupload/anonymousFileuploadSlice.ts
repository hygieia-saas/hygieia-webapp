import { IOperation, RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { defaultRestApiFetch } from '../../app/util';
import { ERestApiDefaultRouteNames, IFileCheckSlotPresignedPostInfo, restApiDefaultRoutes } from 'hygieia-webapp-shared';

export interface IAnonymousFileuploadState {
    readonly fileCheckSlotPresignedPostInfo: IFileCheckSlotPresignedPostInfo|null
    readonly getFileCheckSlotPresignedPostInfoOperation: IOperation
}

export const initialState: IAnonymousFileuploadState = {
    fileCheckSlotPresignedPostInfo: null,
    getFileCheckSlotPresignedPostInfoOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    }
};

export const createFileCheckSlot = createAsyncThunk<IFileCheckSlotPresignedPostInfo, void, { state: RootState, rejectValue: string }>(
    'anonymousFileupload/createFileCheckSlot',
    async (arg, thunkAPI) => {
        return await defaultRestApiFetch(
            restApiDefaultRoutes[ERestApiDefaultRouteNames.createFileCheckSlotForAnonymousUpload].pathPattern.stringify(),
            restApiDefaultRoutes[ERestApiDefaultRouteNames.createFileCheckSlotForAnonymousUpload].verb,
            null,
            JSON.stringify({ recaptchaResponseKey: thunkAPI.getState().session.recaptchaResponseKey })
        )
            .then(response => {
                console.debug(response);
                if (response.status === 201) {
                    return response.json() as Promise<IFileCheckSlotPresignedPostInfo>;
                } else {
                    throw new Error(thunkAPI.getState().translations.translations['apiError.unexpectedResponse'].replace('%code%', response.status.toString()));
                }
            })

            .then(parsedResponseContent => {
                return parsedResponseContent;
            })

            .catch((error: Error) => {
                console.error(error);
                return thunkAPI.rejectWithValue(error.message);
            });
    }
);

export const anonymousFileuploadSlice = createSlice({
    name: 'anonymousFileupload',
    initialState,
    reducers: {
    },
    extraReducers: (builder => {
        builder.addCase(createFileCheckSlot.pending, state => {
            state.getFileCheckSlotPresignedPostInfoOperation.justFinishedSuccessfully = false;
            state.getFileCheckSlotPresignedPostInfoOperation.isRunning = true;
            state.getFileCheckSlotPresignedPostInfoOperation.errorMessage = null;
        });

        builder.addCase(createFileCheckSlot.rejected, (state, action) => {
            state.getFileCheckSlotPresignedPostInfoOperation.justFinishedSuccessfully = false;
            state.getFileCheckSlotPresignedPostInfoOperation.isRunning = false;
            state.getFileCheckSlotPresignedPostInfoOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(createFileCheckSlot.fulfilled, (state, action) => {
            state.getFileCheckSlotPresignedPostInfoOperation.justFinishedSuccessfully = true;
            state.getFileCheckSlotPresignedPostInfoOperation.isRunning = false;
            state.getFileCheckSlotPresignedPostInfoOperation.errorMessage = null;
            state.fileCheckSlotPresignedPostInfo = action.payload
        });
    })
});
