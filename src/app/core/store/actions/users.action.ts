import { Action } from '@ngrx/store';
import { Filter, Page, User } from '@app/core';
import { Error } from '@app/core/models/error.model';

export enum UserActionTypes {
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFail = '[Users] Load Users Fail',
  SaveUser = '[Users] Save User',
  SaveUserSuccess = '[Users] Save User Success',
  SaveUserFail = '[Users] Save User Fail',
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

export class SaveUser implements Action {
  readonly type: string = UserActionTypes.SaveUser;

  constructor(public payload: User) {
  }
}

export class SaveUserSuccess implements Action {
  readonly type: string = UserActionTypes.SaveUserSuccess;

  constructor(public payload: User) {
  }
}

export class SaveUserFail implements Action {
  readonly type: string = UserActionTypes.SaveUserFail;

  constructor(public payload: Error) {
  }
}

export type UsersAction = LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | SaveUser
  | SaveUserSuccess
  | SaveUserFail;
