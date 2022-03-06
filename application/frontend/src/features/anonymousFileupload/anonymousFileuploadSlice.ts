import { IOperation, RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { defaultRestApiFetch } from '../../app/util';
import { ERestApiDefaultRoutesKeys, IFileCheckSlotClientInfo, restApiDefaultRoutes } from 'hygieia-webapp-shared';

export interface IAnonymousFileuploadState {
    readonly fileCheckSlotInfo: IFileCheckSlotClientInfo|null
    readonly getPresignedPostOperation: IOperation
}

export const initialState: IAnonymousFileuploadState = {
    fileCheckSlotInfo: null,
    getPresignedPostOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    }
};

export const createFileCheckSlot = createAsyncThunk<IFileCheckSlotClientInfo, void, { state: RootState, rejectValue: string }>(
    'anonymousFileupload/getPresignedPost',
    async (arg, thunkAPI) => {
        return await defaultRestApiFetch(
            restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].path,
            restApiDefaultRoutes[ERestApiDefaultRoutesKeys.createFileCheckSlotForAnonymousUpload].verb,
            null,
            JSON.stringify({ recaptchaResponseKey: thunkAPI.getState().session.recaptchaResponseKey })
        )
            .then(response => {
                console.debug(response);
                if (response.status === 201) {
                    return response.json() as Promise<IFileCheckSlotClientInfo>;
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
            state.getPresignedPostOperation.justFinishedSuccessfully = false;
            state.getPresignedPostOperation.isRunning = true;
            state.getPresignedPostOperation.errorMessage = null;
        });

        builder.addCase(createFileCheckSlot.rejected, (state, action) => {
            state.getPresignedPostOperation.justFinishedSuccessfully = false;
            state.getPresignedPostOperation.isRunning = false;
            state.getPresignedPostOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(createFileCheckSlot.fulfilled, (state, action) => {
            state.getPresignedPostOperation.justFinishedSuccessfully = true;
            state.getPresignedPostOperation.isRunning = false;
            state.getPresignedPostOperation.errorMessage = null;
            state.fileCheckSlotInfo = action.payload
        });
    })
});
