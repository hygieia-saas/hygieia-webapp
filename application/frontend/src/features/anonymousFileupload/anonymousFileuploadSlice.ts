import { IOperation, RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { defaultRestApiFetch } from '../../app/util';

interface IPresignedPost {
    method: string
    url: string
    fields: { [type: string]: string }
}

export interface IAnonymousFileuploadState {
    readonly presignedPost: IPresignedPost|null
    readonly getPresignedPostOperation: IOperation
}

export const initialState: IAnonymousFileuploadState = {
    presignedPost: null,
    getPresignedPostOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    }
};

export const getPresignedPostCommand = createAsyncThunk<IPresignedPost, void, { state: RootState, rejectValue: string }>(
    'anonymousFileupload/getPresignedPost',
    async (arg, thunkAPI) => {
        return await defaultRestApiFetch(
            '/anonymous-upload-presigned-posts/',
            'POST',
            null
        )
            .then(response => {
                console.debug(response);
                if (response.status === 201) {
                    return response.json() as Promise<IPresignedPost>;
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
        builder.addCase(getPresignedPostCommand.pending, state => {
            state.getPresignedPostOperation.justFinishedSuccessfully = false;
            state.getPresignedPostOperation.isRunning = true;
            state.getPresignedPostOperation.errorMessage = null;
        });

        builder.addCase(getPresignedPostCommand.rejected, (state, action) => {
            state.getPresignedPostOperation.justFinishedSuccessfully = false;
            state.getPresignedPostOperation.isRunning = false;
            state.getPresignedPostOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(getPresignedPostCommand.fulfilled, (state, action) => {
            state.getPresignedPostOperation.justFinishedSuccessfully = true;
            state.getPresignedPostOperation.isRunning = false;
            state.getPresignedPostOperation.errorMessage = null;
            state.presignedPost = action.payload
        });
    })
});
