import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as importUsersActions from '../actions/import-users.action';
import * as fileUploadActions from '../actions/file-upload.action';
import { UploadCompletedWithResponseAction } from '../actions/file-upload.action';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../../models';
import { UserService } from '../../services';
import { Router } from '@angular/router';

@Injectable()
export class ImportUsersEffects {

  @Effect()
  importFromCsvEffect$: Observable<importUsersActions.ImportFromCsvSuccess> = this.actions$.pipe(
    ofType(fileUploadActions.FileUploadActionTypes.UPLOAD_COMPLETED_WITH_RESPONSE),
    map((response: UploadCompletedWithResponseAction) => new importUsersActions.ImportFromCsvSuccess(response.payload as User[]))
  );

  @Effect()
  saveImportedEffect$ = this.actions$.pipe(
    ofType(importUsersActions.ImportUserActionTypes.SaveImportedUsers),
    switchMap(() => {
      return this.usersService.saveMultiple()
        .pipe(
          map((savedUsers: User[]) => new importUsersActions.ImportedUsersSaveSuccess(savedUsers)),
          catchError(payload => of(new importUsersActions.ImportedUsersSaveFailed(payload.error)))
        );
    })
  );

  @Effect({dispatch: false})
  successfulImportSave$ = this.actions$.pipe(
    ofType(importUsersActions.ImportUserActionTypes.ImportedUsersSaveSuccess),
    take(1),
    tap(() => this.router.navigate(['/users'])),
  );

  constructor(private actions$: Actions,
              private usersService: UserService,
              private router: Router) {
  }

}
