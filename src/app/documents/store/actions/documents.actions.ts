import { Action } from '@ngrx/store';
import { Page } from '@app/core';
import { DocumentConsolidate } from '@app/documents/models/document-consolidate.model';

export enum DocumentsActionTypes {
  LoadDocuments = '[Documents] Load Documents',
  LoadDocumentsSuccess = '[Documents] Load Documents Success',
  LoadDocumentsFail = '[Documents] Load Documents Fail'
}

export class LoadDocuments implements Action {
  readonly type = DocumentsActionTypes.LoadDocuments;
}

export class LoadDocumentsSuccess implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentsSuccess;

  constructor(public payload: Page<DocumentConsolidate>) {}
}

export class LoadDocumentsFail implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentsFail;

  constructor(public error: any) {}
}

export type DocumentsActions =
  | LoadDocuments
  | LoadDocumentsFail
  | LoadDocumentsSuccess;
