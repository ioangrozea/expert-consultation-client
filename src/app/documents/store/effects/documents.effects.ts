import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import * as documentsActions from '../actions/documents.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DocumentsService } from '@app/documents/services';
import { Page } from '@app/core';
import { DocumentConsolidate } from '@app/documents/models/document-consolidate.model';
import { of } from 'rxjs';

@Injectable()
export class DocumentsEffects {
  constructor(
    private actions$: Actions,
    private documentsService: DocumentsService
  ) {}

  loadDocuments$ = this.actions$.pipe(
    ofType(documentsActions.DocumentsActionTypes.LoadDocuments),
    switchMap(() => this.documentsService.list()),
    map(
      (documentsPage: Page<DocumentConsolidate>) =>
        new documentsActions.LoadDocumentsSuccess(documentsPage)
    ),
    catchError(error => of(new documentsActions.LoadDocumentsFail(error)))
  );
}
