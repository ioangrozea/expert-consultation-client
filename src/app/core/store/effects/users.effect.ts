import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usersActions from '../actions/users.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../services';
import { User } from '@app/core';
import { of } from 'rxjs';
import { Page } from '@app/core/models/page.model';

@Injectable()
export class UsersEffects {
  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(usersActions.UserActionTypes.LoadUsers),
    switchMap(() => {
      return this.usersService.list()
        .pipe(
          map((usersPage: Page<User>) => new usersActions.LoadUsersSuccess(usersPage)),
          catchError(error => of(new usersActions.LoadUsersFail(error)))
        );
    })
  );

  constructor(private actions$: Actions,
              private usersService: UsersService) {
  }
}
