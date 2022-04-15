import { IOperation, RootState } from '../../app/store';
import { AnyAction, createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { defaultRestApiFetch } from '../../app/util';
import {
    ERestApiDefaultRouteNames,
    IFileCheckSlotPresignedPostInfo,
    restApiDefaultRoutes,
    IFileCheckSlotStatusInfo,
    EFileCheckAvStatus
} from 'hygieia-webapp-shared';

export interface IAnonymousFileuploadState {
    readonly fileCheckSlotPresignedPostInfo: IFileCheckSlotPresignedPostInfo|null
    readonly getFileCheckSlotPresignedPostInfoOperation: IOperation

    readonly fileCheckSlotStatusInfo: IFileCheckSlotStatusInfo|null
    readonly getFileCheckSlotStatusInfoOperation: IOperation

    readonly uploadStarted: boolean
    readonly uploadProgress: number
    readonly uploadFinishedSuccessfully: boolean
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
    },

    uploadStarted: false,
    uploadProgress: 0,
    uploadFinishedSuccessfully: false
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

export const getFileCheckSlotStatusInfo = createAsyncThunk<IFileCheckSlotStatusInfo, IFileCheckSlotPresignedPostInfo['id'], { state: RootState, rejectValue: string }>(
    'anonymousFileupload/getFileCheckSlotStatusInfo',
    async (arg, thunkAPI) => {
        return await defaultRestApiFetch(
            restApiDefaultRoutes[ERestApiDefaultRouteNames.getFileCheckSlotForAnonymousUploadStatus].pathPattern.stringify({ id: arg }),
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


let repeatedlyGetFileCheckSlotStatusInfoTimer: NodeJS.Timer | null = null;
export const startRepeatedlyGetFileCheckSlotStatusInfo = createAsyncThunk<void, IFileCheckSlotPresignedPostInfo['id'], { state: RootState }>(
    'anonymousFileupload/startRepeatedlyGetFileCheckSlotStatusInfo',
    (arg, thunkAPI) => {

        if (repeatedlyGetFileCheckSlotStatusInfoTimer !== null) {
            clearInterval(repeatedlyGetFileCheckSlotStatusInfoTimer);
            repeatedlyGetFileCheckSlotStatusInfoTimer = null;
        }

        repeatedlyGetFileCheckSlotStatusInfoTimer = setInterval(
            () => dispatchGetFileCheckSlotStatusInfo(
                thunkAPI.getState,
                thunkAPI.dispatch
            ),
            1000
        );

        const dispatchGetFileCheckSlotStatusInfo = (getState: () => RootState, dispatch: ThunkDispatch<RootState, unknown, AnyAction>): void => {

            const anonymousFileuploadState = getState().anonymousFileupload;

            if (   anonymousFileuploadState.fileCheckSlotStatusInfo === null
                || anonymousFileuploadState.fileCheckSlotStatusInfo.avStatus === EFileCheckAvStatus.unkown
                && !anonymousFileuploadState.getFileCheckSlotStatusInfoOperation.isRunning
            ) {
                void dispatch(getFileCheckSlotStatusInfo(arg));
            }
        };
    }
);


export const anonymousFileuploadSlice = createSlice({
    name: 'anonymousFileupload',
    initialState,
    reducers: {
        uploadStarted: state => {
            state.uploadStarted = true;
        },

        uploadProgressedTo: (state, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },

        uploadFinishedSuccessfully: state => {
            state.uploadFinishedSuccessfully = true;
        }
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
