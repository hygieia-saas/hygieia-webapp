import { IOperation, RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { defaultRestApiFetch } from '../../app/util';
import { ERestApiDefaultRouteNames, IFileCheckSlotPresignedPostInfo, restApiDefaultRoutes, IFileCheckSlotStatusInfo } from 'hygieia-webapp-shared';

export interface IAnonymousFileuploadState {
    readonly fileCheckSlotPresignedPostInfo: IFileCheckSlotPresignedPostInfo|null
    readonly getFileCheckSlotPresignedPostInfoOperation: IOperation

    readonly fileCheckSlotStatusInfo: IFileCheckSlotStatusInfo|null
    readonly getFileCheckSlotStatusInfoOperation: IOperation
}

export const initialState: IAnonymousFileuploadState = {
    fileCheckSlotPresignedPostInfo: null,
    getFileCheckSlotPresignedPostInfoOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    },

    fileCheckSlotStatusInfo: null,
    getFileCheckSlotStatusInfoOperation: {
        isRunning: false,
        justFinishedSuccessfully: false,
        errorMessage: null
    }
};

export const getFileCheckSlotPresignedPostInfo = createAsyncThunk<IFileCheckSlotPresignedPostInfo, void, { state: RootState, rejectValue: string }>(
    'anonymousFileupload/getFileCheckSlotPresignedPostInfo',
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

export const getFileCheckSlotStatusInfo = createAsyncThunk<IFileCheckSlotStatusInfo, void, { state: RootState, rejectValue: string }>(
    'anonymousFileupload/getFileCheckSlotStatusInfo',
    async (arg, thunkAPI) => {
        return await defaultRestApiFetch(
            restApiDefaultRoutes[ERestApiDefaultRouteNames.getFileCheckSlotForAnonymousUploadStatus].pathPattern.stringify(),
            restApiDefaultRoutes[ERestApiDefaultRouteNames.getFileCheckSlotForAnonymousUploadStatus].verb
        )
            .then(response => {
                console.debug(response);
                if (response.status === 200) {
                    return response.json() as Promise<IFileCheckSlotStatusInfo>;
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
        builder.addCase(getFileCheckSlotPresignedPostInfo.pending, state => {
            state.getFileCheckSlotPresignedPostInfoOperation.justFinishedSuccessfully = false;
            state.getFileCheckSlotPresignedPostInfoOperation.isRunning = true;
            state.getFileCheckSlotPresignedPostInfoOperation.errorMessage = null;
        });

        builder.addCase(getFileCheckSlotPresignedPostInfo.rejected, (state, action) => {
            state.getFileCheckSlotPresignedPostInfoOperation.justFinishedSuccessfully = false;
            state.getFileCheckSlotPresignedPostInfoOperation.isRunning = false;
            state.getFileCheckSlotPresignedPostInfoOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(getFileCheckSlotPresignedPostInfo.fulfilled, (state, action) => {
            state.getFileCheckSlotPresignedPostInfoOperation.justFinishedSuccessfully = true;
            state.getFileCheckSlotPresignedPostInfoOperation.isRunning = false;
            state.getFileCheckSlotPresignedPostInfoOperation.errorMessage = null;
            state.fileCheckSlotPresignedPostInfo = action.payload
        });


        builder.addCase(getFileCheckSlotStatusInfo.pending, state => {
            state.getFileCheckSlotStatusInfoOperation.justFinishedSuccessfully = false;
            state.getFileCheckSlotStatusInfoOperation.isRunning = true;
            state.getFileCheckSlotStatusInfoOperation.errorMessage = null;
        });

        builder.addCase(getFileCheckSlotStatusInfo.rejected, (state, action) => {
            state.getFileCheckSlotStatusInfoOperation.justFinishedSuccessfully = false;
            state.getFileCheckSlotStatusInfoOperation.isRunning = false;
            state.getFileCheckSlotStatusInfoOperation.errorMessage = action.payload ?? 'Unknown error';
        });

        builder.addCase(getFileCheckSlotStatusInfo.fulfilled, (state, action) => {
            state.getFileCheckSlotStatusInfoOperation.justFinishedSuccessfully = true;
            state.getFileCheckSlotStatusInfoOperation.isRunning = false;
            state.getFileCheckSlotStatusInfoOperation.errorMessage = null;
            state.fileCheckSlotStatusInfo = action.payload
        });
    })
});
