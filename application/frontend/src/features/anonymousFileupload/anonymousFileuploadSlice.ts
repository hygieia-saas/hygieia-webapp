import { IOperation, RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { defaultRestApiFetch } from '../../app/util';


export interface IAnonymousFileuploadState {
    readonly presignedUrl: string|null
    readonly getPresignedUrlOperation: IOperation
}

export const initialState: IAnonymousFileuploadState = {
    presignedUrl: null,
    getPresignedUrlOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    }
};

export const getPresignedUrlCommand = createAsyncThunk<string, void, { state: RootState, rejectValue: string }>(
    'anonymousFileupload/getPresignedUrl',
    async (arg, thunkAPI) => {
        return await defaultRestApiFetch(
            '/anonymous-upload-presigned-urls/',
            'POST',
            null
        )
            .then(response => {
                console.debug(response);
                if (response.status === 201) {
                    return response.json() as Promise<string>;
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
        builder.addCase(getPresignedUrlCommand.pending, state => {
            state.getPresignedUrlOperation.justFinishedSuccessfully = false;
            state.getPresignedUrlOperation.isRunning = true;
            state.getPresignedUrlOperation.errorMessage = null;
        });

        builder.addCase(getPresignedUrlCommand.rejected, (state, action) => {
            state.getPresignedUrlOperation.justFinishedSuccessfully = false;
            state.getPresignedUrlOperation.isRunning = false;
            state.getPresignedUrlOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(getPresignedUrlCommand.fulfilled, (state, action) => {
            state.getPresignedUrlOperation.justFinishedSuccessfully = true;
            state.getPresignedUrlOperation.isRunning = false;
            state.getPresignedUrlOperation.errorMessage = null;
            state.presignedUrl = action.payload
        });
    })
});
