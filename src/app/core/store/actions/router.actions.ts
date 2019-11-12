import { Action } from '@ngrx/store';

export enum RouterType {
  RouteChange = '[Router] Route Change',
}


export class RouteChange implements Action {
  readonly type = RouterType.RouteChange;

  constructor(public payload: { path: string, params?: any }) {
  }
}
