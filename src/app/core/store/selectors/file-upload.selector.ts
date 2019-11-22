import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  FileUploadState,
  getCompleted,
  getError,
  getFailed,
  getInProgress,
  getProgress,
  getReady,
  getRequested,
  getResult,
  getStarted
} from '../reducers/file-upload.reducer';
import * as fromFeature from '../reducers';

export const selectUploadFileFeatureState: MemoizedSelector<object, FileUploadState>
  = createSelector(fromFeature.getCoreState, (state) => state.fileUpload);

export const selectUploadFileError: MemoizedSelector<object,
  string> = createSelector(
  selectUploadFileFeatureState,
  getError
);

export const selectUploadFileReady: MemoizedSelector<object, boolean> = createSelector(
  selectUploadFileFeatureState,
  getReady
);

export const selectUploadFileRequested: MemoizedSelector<object,
  boolean> = createSelector(
  selectUploadFileFeatureState,
  getRequested
);

export const selectUploadFileStarted: MemoizedSelector<object,
  boolean> = createSelector(
  selectUploadFileFeatureState,
  getStarted
);

export const selectUploadFileProgress: MemoizedSelector<object,
  number> = createSelector(
  selectUploadFileFeatureState,
  getProgress
);

export const selectUploadFileInProgress: MemoizedSelector<object,
  boolean> = createSelector(
  selectUploadFileFeatureState,
  getInProgress
);

export const selectUploadFileFailed: MemoizedSelector<object,
  boolean> = createSelector(
  selectUploadFileFeatureState,
  getFailed
);

export const selectUploadFileCompleted: MemoizedSelector<object,
  boolean> = createSelector(
  selectUploadFileFeatureState,
  getCompleted
);

export const selectResult: MemoizedSelector<object,
  any> = createSelector(
  selectUploadFileFeatureState,
  getResult
);
