import { FileUploadAction, FileUploadActionTypes } from '../actions/file-upload.action';

export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed'
}

export interface FileUploadState {
  status: UploadStatus;
  error: string | null;
  progress: number;
  result: any;
}

export const initialState: FileUploadState = {
  status: UploadStatus.Ready,
  error: null,
  progress: 0,
  result: {}
};

export const getError = (state: FileUploadState): string => state.error;

export const getStarted = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Started;

export const getRequested = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Requested;

export const getReady = (state: FileUploadState): boolean => state.status === UploadStatus.Ready;

export const getProgress = (state: FileUploadState): number => state.progress;

export const getInProgress = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Started && state.progress >= 0;

export const getFailed = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Failed;

export const getCompleted = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Completed;

export const getResult = (state: FileUploadState): any => state.result;

export function fileUploadReducer(state = initialState, action: FileUploadAction): FileUploadState {
  switch (action.type) {
    case FileUploadActionTypes.UPLOAD_REQUEST: {
      return {
        ...state,
        status: UploadStatus.Requested,
        progress: null,
        error: null
      };
    }
    case FileUploadActionTypes.UPLOAD_CANCEL: {
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null
      };
    }
    case FileUploadActionTypes.UPLOAD_RESET: {
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null
      };
    }
    case FileUploadActionTypes.UPLOAD_FAILURE: {
      return {
        ...state,
        status: UploadStatus.Failed,
        error: action.payload.error,
        progress: null
      };
    }
    case FileUploadActionTypes.UPLOAD_STARTED: {
      return {
        ...state,
        status: UploadStatus.Started,
        progress: 0
      };
    }
    case FileUploadActionTypes.UPLOAD_PROGRESS: {
      return {
        ...state,
        progress: action.payload.progress
      };
    }
    case FileUploadActionTypes.UPLOAD_COMPLETED: {
      return {
        ...state,
        status: UploadStatus.Completed,
        progress: 100,
        error: null
      };
    }
    default: {
      return state;
    }
  }
}
