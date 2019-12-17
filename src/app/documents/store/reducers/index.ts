import * as fromDocuments from './documents.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface DocumentsState {
  documents: fromDocuments.DocumentsState;
}

export const reducers: ActionReducerMap<DocumentsState> = {
  documents: fromDocuments.reducer
};

export const getDocumentsState = createFeatureSelector<DocumentsState>(
  'consolidate-documents'
);
