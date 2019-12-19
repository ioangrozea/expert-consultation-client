import { DocumentConsolidate, IDocumentConsolidate } from '@app/documents/models/document-consolidate.model';
import { Error, IPageData, PageData } from '@app/core';
import * as fromActions from '../actions';
import { DocumentsActionTypes } from '../actions';

export interface DocumentsState {
  entities: { [id: string]: IDocumentConsolidate };
  loaded: boolean;
  loading: boolean;
  pageData: IPageData;
  error: Error;
}

export const initialState: DocumentsState = {
  entities: {},
  loaded: false,
  loading: false,
  pageData: {} as IPageData,
  error: null
};

export function reducer(state = initialState, action: fromActions.DocumentsActions): DocumentsState {

  switch (action.type) {
    case DocumentsActionTypes.LoadDocuments:
      return {
        ...state,
        loading: true,
      };
    case DocumentsActionTypes.LoadDocumentsSuccess: {
      const documentsPage = action.payload;
      const documents = documentsPage.content;
      const entities = documents.reduce((e: { [id: string]: DocumentConsolidate }, document: DocumentConsolidate) => {
        return {
          ...e,
          [document.id]: document.toJson(),
        };
      }, {});
      const pageData = new PageData();
      pageData.fromPage(documentsPage);

      return {
        ...state,
        loading: false,
        loaded: true,
        pageData: pageData.toJson(),
        entities,
      };
    }
    case DocumentsActionTypes.LoadDocumentsFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default: {
      return state;
    }
  }
}


export const getDocumentsEntities = (state: DocumentsState) => state.entities;
export const getDocumentsLoading = (state: DocumentsState) => state.loading;
export const getDocumentsLoaded = (state: DocumentsState) => state.loaded;
export const getDocumentsPageData = (state: DocumentsState) => state.pageData;
