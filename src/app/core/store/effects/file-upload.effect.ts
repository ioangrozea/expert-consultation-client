import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, takeUntil } from 'rxjs/operators';
import { serializeError } from 'serialize-error';
import { FileUploadService } from '../../services/file-upload.service';
import * as fileUploadActions from '../actions/file-upload.action';
import {
  FileUploadActionTypes,
  UploadCompletedAction,
  UploadCompletedWithResponseAction,
  UploadFailureAction,
  UploadProgressAction,
  UploadStartedAction
} from '../actions/file-upload.action';

@Injectable()
export class UploadFileEffects {
  @Effect()
  uploadFileEffect$: Observable<{}> = this.actions$.pipe(
    ofType(fileUploadActions.FileUploadActionTypes.UPLOAD_REQUEST),
    concatMap((action: fileUploadActions.UploadRequestAction) =>
      this.fileUploadService.uploadFile(action.payload.file, action.payload.url).pipe(
        takeUntil(
          this.actions$.pipe(
            ofType(FileUploadActionTypes.UPLOAD_CANCEL)
          )
        ),
        map((event: HttpEvent<any>) => this.getActionFromHttpEvent(event)),
        catchError(error => of(this.handleError(error)))
      )
    )
  );

  constructor(
    private fileUploadService: FileUploadService,
    private actions$: Actions) {
  }

  private getActionFromHttpEvent(event: HttpEvent<any>): Action {
    switch (event.type) {
      case HttpEventType.Sent: {
        return new UploadStartedAction();
      }
      case HttpEventType.UploadProgress: {
        return new UploadProgressAction({
          progress: Math.round((100 * event.loaded) / event.total)
        });
      }
      case HttpEventType.ResponseHeader:
        if (event.status === 200) {
          return new UploadCompletedAction();
        } else {
          return new UploadFailureAction({
            error: event.statusText
          });
        }
      case HttpEventType.Response: {
        if (event.status === 200) {
          return new UploadCompletedWithResponseAction(event.body);
        } else {
          return new UploadFailureAction({
            error: event.statusText
          });
        }
      }
      case HttpEventType.DownloadProgress: {
        return new UploadCompletedAction();
      }
      default: {
        return new UploadFailureAction({
          error: `Unknown Event: ${JSON.stringify(event)}`
        });
      }
    }
  }

  private handleError(error: any) {
    const friendlyErrorMessage = serializeError(error).message;
    return new UploadFailureAction({
      error: friendlyErrorMessage
    });
  }
}
