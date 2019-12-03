import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as documentsActions from '../actions/documents.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DocumentsService } from '@app/documents/services';
import { Page } from '@app/core';
import { DocumentConsolidate } from '@app/documents/models/document-consolidate.model';
import { of } from 'rxjs';
import * as fileUploadActions from '../../../core/store/actions/file-upload.action';
import * as fromStore from '../../store';
import { CoreState } from '@app/core/store';
import { Store } from '@ngrx/store';

@Injectable()
export class DocumentsEffects {
  loadDocuments$ = this.actions$.pipe(
    ofType(documentsActions.DocumentsActionTypes.LoadDocuments),
    switchMap(() => this.documentsService.list()),
    map(
      (documentsPage: Page<DocumentConsolidate>) =>
        new documentsActions.LoadDocumentsSuccess(documentsPage)
    ),
    catchError(error => of(new documentsActions.LoadDocumentsFail(error)))
  );

  // ToDo: nici asa nu merge
  /*@Effect()
  uploadDocumentFile$ = this.actions$.pipe(
    ofType(
      fileUploadActions.FileUploadActionTypes.UPLOAD_COMPLETED_WITH_RESPONSE
    ),
    take(1),
    tap((action: any) => {
      this.store$.pipe(select(fromStore.getFilePath)).pipe(
        map((filePath: string) => {
          if (filePath !== null) {
            this.newFileLoaded(action, filePath);
          } else {
            this.fileLoaded(action);
          }
        })
      );
    })
  );*/

  // ToDo: de ce nu merge asa?
  /*@Effect()
  uploadDocumentFile$ = this.actions$.pipe(
    ofType(fileUploadActions.FileUploadActionTypes.UPLOAD_COMPLETED_WITH_RESPONSE),
    map((action: any) => {
      this.store$.pipe(select(fromStore.getFilePath)).pipe(
        map((filePath: string) => {
          if (filePath !== null) {
            this.newFileLoaded(action, filePath);
          } else {
            this.fileLoaded(action);
          }
        }));
    }));*/

  // ToDo: de ce merge?
  /*
    @Effect()
    uploadDocumentFile$ = this.actions$.pipe(
      ofType(fileUploadActions.FileUploadActionTypes.UPLOAD_COMPLETED_WITH_RESPONSE),
      map((action: any) => {
        if (getFilePath) {
          this.store$.dispatch(new documentsActions.SaveDocumentFileSuccess(action.payload));
          const filePath = getFilePath(action.payload);
          this.store$.dispatch(new fileUploadActions.DeleteFileAction(filePath));
        } else {
          this.store$.dispatch(new documentsActions.SaveDocumentFileSuccess(action.payload));
        }
      })
    );
  */

  // ToDo: si cand dai save fara sa faci nimic iti da eroare de dispatch si save nu face dispatch la nici un action....

  @Effect()
  saveDocument$ = this.actions$.pipe(
    ofType(documentsActions.DocumentsActionTypes.SaveDocument),
    map((action: any) => {
      this.documentsService.saveDocument(action.payload);
    }),
    catchError(err => of(new fromStore.SaveDocumentFail(err)))
  );

  constructor(
    private store$: Store<CoreState>,
    private actions$: Actions,
    private documentsService: DocumentsService
  ) {}

  private fileLoaded(action: any) {
    this.store$.dispatch(
      new documentsActions.SaveDocumentFileSuccess(action.payload)
    );
  }

  private newFileLoaded(action: any, filePath) {
    this.store$.dispatch(
      new documentsActions.SaveDocumentFileSuccess(action.payload)
    );
    this.store$.dispatch(new fileUploadActions.DeleteFileAction(filePath));
  }
}
