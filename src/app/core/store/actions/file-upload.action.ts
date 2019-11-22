import { Action } from '@ngrx/store';

export enum FileUploadActionTypes {
  UPLOAD_REQUEST = '[File Upload Form] Request',
  UPLOAD_CANCEL = '[File Upload Form] Cancel',
  UPLOAD_RESET = '[File Upload Form] Reset',
  UPLOAD_STARTED = '[File Upload API] Started',
  UPLOAD_PROGRESS = '[File Upload API] Progress',
  UPLOAD_FAILURE = '[File Upload API] Failure',
  UPLOAD_COMPLETED = '[File Upload API] Completed',
  UPLOAD_COMPLETED_WITH_RESPONSE = '[File Upload API] Completed with response',
}

export class UploadRequestAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_REQUEST;

  constructor(public payload: { file: File, url: string }) {
  }
}

export class UploadCancelAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_CANCEL;
}

export class UploadResetAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_RESET;
}

export class UploadStartedAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_STARTED;
}

export class UploadProgressAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_PROGRESS;

  constructor(public payload: { progress: number }) {
  }
}

export class UploadFailureAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export class UploadCompletedAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_COMPLETED;

  constructor() {
  }
}

export class UploadCompletedWithResponseAction implements Action {
  readonly type = FileUploadActionTypes.UPLOAD_COMPLETED_WITH_RESPONSE;

  constructor(public payload: any) {
  }
}


export type FileUploadAction =
  | UploadRequestAction
  | UploadCancelAction
  | UploadResetAction
  | UploadStartedAction
  | UploadProgressAction
  | UploadFailureAction
  | UploadCompletedAction;
