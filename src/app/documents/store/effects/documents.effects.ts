import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as documentsActions from '../actions/documents.actions';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { DocumentsService } from '@app/documents/services';
import { Error, Page } from '@app/core';
import { DocumentConsolidate } from '@app/documents/models/document-consolidate.model';
import { of } from 'rxjs';
import { CoreState } from '@app/core/store';
import { Store } from '@ngrx/store';
import { DocumentMetadata } from '@app/documents/models/document-metadata.model';

@Injectable()
export class DocumentsEffects {
  @Effect()
  loadDocuments$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.LoadDocuments),
      switchMap(() => this.documentsService.list()),
      map((documentsPage: Page<DocumentConsolidate>) => new documentsActions.LoadDocumentsSuccess(documentsPage)),
      catchError(error => of(new documentsActions.LoadDocumentsFail(error)))
  );

  @Effect()
  saveDocument$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.SaveDocument),
      map((action: documentsActions.SaveDocument) => action.payload),
      concatMap((document: DocumentMetadata) => {
        return this.documentsService.save(document).pipe(
            map((savedDocument: DocumentMetadata) => new documentsActions.SaveDocumentSuccess(savedDocument)),
            catchError(error => of(new documentsActions.SaveDocumentFail(this.mapError(error))))
        );
      })
  );

  constructor(private store$: Store<CoreState>,
              private actions$: Actions,
              private documentsService: DocumentsService) {
  }

  private mapError(payload: any): Error {
    return payload.error.i18nFieldErrors;
  }
}
