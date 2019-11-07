import { Action } from '@ngrx/store';
import { Filter, Page, User } from '@app/core';

export enum UserActionTypes {
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFail = '[Users] Load Users Fail',
}

export class LoadUsers implements Action {
  readonly type: string = UserActionTypes.LoadUsers;

  constructor(public payload?: Filter) {
  }
}

export class LoadUsersSuccess implements Action {
  readonly type: string = UserActionTypes.LoadUsersSuccess;

  constructor(public payload: Page<User>) {
  }
}

export class LoadUsersFail implements Action {
  readonly type: string = UserActionTypes.LoadUsersFail;

  constructor(public payload: any) {
  }
}

export type UsersAction = LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail;
