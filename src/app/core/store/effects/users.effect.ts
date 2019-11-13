import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usersActions from '../actions/users.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUser, User, UsersService } from '@app/core';
import { of } from 'rxjs';
import { Page } from '@app/core/models/page.model';
import { Router } from '@angular/router';

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

  @Effect()
  saveUser$ = this.actions$.pipe(
    ofType(usersActions.UserActionTypes.SaveUser),
    map((action: usersActions.SaveUser) => action.payload),
    switchMap((user: User) => {
      return this.usersService.save(user)
        .pipe(
          map((savedUser: IUser) => new usersActions.SaveUserSuccess(savedUser)),
          catchError(error => of(new usersActions.SaveUserFail(error)))
        );
    })
  );

  @Effect({dispatch: false})
  successfulSave$ = this.actions$.pipe(
    ofType(usersActions.UserActionTypes.SaveUserSuccess),
    tap(() => this.router.navigate(['/users'])),
  );

  constructor(private actions$: Actions,
              private usersService: UsersService,
              private router: Router) {
  }
}
