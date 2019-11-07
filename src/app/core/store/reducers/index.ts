import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { UserState } from '@app/core/store/reducers/users.reducer';
import * as fromUsers from './users.reducer';

export interface State {
  core: CoreState;
}

export interface CoreState {
  users: UserState;
}

export const reducers: ActionReducerMap<CoreState> = {
  users: fromUsers.reducer,
};

export const getCoreState = createFeatureSelector<CoreState>('core');

export { UserState } from './users.reducer';
