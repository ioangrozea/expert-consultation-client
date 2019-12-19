import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromDocuments from '../reducers/documents.reducer';
import {DocumentConsolidate, IDocumentConsolidate} from '@app/documents/models/document-consolidate.model';
import {User} from '@app/core';

const getDocumentsState = createSelector(fromFeature.getDocumentsState,
  (state: fromFeature.DocumentsState) => state.documents
);

const getDocumentsAsInterfaces = createSelector(getDocumentsState, fromDocuments.getDocumentsEntities);

export const getDocumentsEntities = createSelector(getDocumentsAsInterfaces,
  (documents: {[id: string]: IDocumentConsolidate}) => {
    const documentsEntities = {};

    Object.keys(documents).map(key => {
      documentsEntities[key] = new User(documentsEntities[key]);
    });

    return documentsEntities;
  }
);

export const getDocuments = createSelector(getDocumentsEntities,
  (entities: { [id: number]: DocumentConsolidate }) =>  Object.keys(entities).map(id => entities[id])
);
export const getDocumentsLoaded = createSelector(getDocumentsState, fromDocuments.getDocumentsLoaded);
export const getDocumentsLoading = createSelector(getDocumentsState, fromDocuments.getDocumentsLoading);
export const getDocumentsPageData = createSelector(getDocumentsState, fromDocuments.getDocumentsPageData);
