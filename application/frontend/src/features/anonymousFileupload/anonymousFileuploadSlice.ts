import { IOperation, RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { defaultRestApiFetch } from '../../app/util';
import { IFileCheckSlot } from 'hygieia-webapp-shared';

export interface IAnonymousFileuploadState {
    readonly fileCheckSlot: IFileCheckSlot|null
    readonly getPresignedPostOperation: IOperation
}

export const initialState: IAnonymousFileuploadState = {
    fileCheckSlot: null,
    getPresignedPostOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    }
};

export const createFileCheckSlot = createAsyncThunk<IFileCheckSlot, void, { state: RootState, rejectValue: string }>(
    'anonymousFileupload/getPresignedPost',
    async (arg, thunkAPI) => {
        return await defaultRestApiFetch(
            '/anonymous-upload-presigned-posts/',
            'POST',
            null,
            JSON.stringify({ recaptchaResponseKey: thunkAPI.getState().session.recaptchaResponseKey })
        )
            .then(response => {
                console.debug(response);
                if (response.status === 201) {
                    return response.json() as Promise<IFileCheckSlot>;
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
            state.fileCheckSlot = action.payload
        });
    })
});
