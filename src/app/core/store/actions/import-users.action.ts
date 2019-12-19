import { Action } from '@ngrx/store';
import { User } from '../../models';

export enum ImportUserActionTypes {
  ImportFromCsvCompleted = '[Import Users] Import From Csv',
  ImportFromCsvSuccess = '[Import Users] Import From Csv Success',
  UpdateImportedUser = '[Import Users] Update Imported User',
  DeleteImportedUser = '[Import Users] Delete Imported User',
  SaveImportedUsers = '[Import Users] Save Imported Users',
  ImportedUsersSaveSuccess = '[Import Users] Imported Users Save Success',
  ImportedUsersSaveFailed = '[Import Users] Imported Users Save Failed',
}

export class ImportFromCsvCompleted implements Action {
  readonly type = ImportUserActionTypes.ImportFromCsvCompleted;

  constructor(public payload: User[]) {
  }
}

export class UpdateImportedUser implements Action {
  readonly type = ImportUserActionTypes.UpdateImportedUser;

  constructor(public payload: User) {
  }
}

export class DeleteImportedUser implements Action {
  readonly type = ImportUserActionTypes.DeleteImportedUser;

  constructor(public payload: string) {
  }
}

export class SaveImportedUsers implements Action {
  readonly type = ImportUserActionTypes.SaveImportedUsers;

  constructor() {
  }
}

export class ImportedUsersSaveSuccess implements Action {
  readonly type = ImportUserActionTypes.ImportedUsersSaveSuccess;

  constructor(public payload: User[]) {
  }
}

export class ImportedUsersSaveFailed implements Action {
  readonly type = ImportUserActionTypes.ImportedUsersSaveFailed;

  constructor(public payload: any) {
  }
}

export class ImportFromCsvSuccess implements Action {
  readonly type = ImportUserActionTypes.ImportFromCsvSuccess;

  constructor(public payload: User[]) {
  }
}

export type ImportUsersAction = ImportFromCsvCompleted
  | ImportFromCsvSuccess
  | UpdateImportedUser
  | DeleteImportedUser
  | SaveImportedUsers
  | ImportedUsersSaveSuccess
  | ImportedUsersSaveFailed;
