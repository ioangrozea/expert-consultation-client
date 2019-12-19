import { Action } from '@ngrx/store';
import { Page } from '@app/core';
import { DocumentConsolidate } from '@app/documents/models/document-consolidate.model';
import { IDocumentMetadata } from '@app/documents/models/document-metadata.model';

export enum DocumentsActionTypes {
  LoadDocuments = '[Documents] Load Documents',
  LoadDocumentsSuccess = '[Documents] Load Documents Success',
  LoadDocumentsFail = '[Documents] Load Documents Fail',
  SaveDocument = '[Documents] Save Documents',
  SaveDocumentSuccess = '[Documents] Save Documents Success',
  SaveDocumentFail = '[Documents] Save Documents Fail'
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

export class SaveDocument implements Action {
  readonly type = DocumentsActionTypes.SaveDocument;

  constructor(public payload: IDocumentMetadata) {}
}

export class SaveDocumentSuccess implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentSuccess;

  constructor(public payload: IDocumentMetadata) {}
}

export class SaveDocumentFail implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentFail;

  constructor(public payload: any) {}
}

export type DocumentsActions =
    | LoadDocuments
    | LoadDocumentsFail
    | LoadDocumentsSuccess
    | SaveDocument
    | SaveDocumentSuccess
    | SaveDocumentFail;
