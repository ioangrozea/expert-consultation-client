import {Action} from '@ngrx/store';

export enum RouterType {
  RouterBack = '[Router] Back',
  RouterForward = '[Router] Forward',
  RouteChange = '[Router] Route Change',
}

export class RouterBack implements Action {
  readonly type = RouterType.RouterBack;
}

export class RouterForward implements Action {
  readonly type = RouterType.RouterForward;
}

export class RouteChange implements Action {
  readonly type = RouterType.RouteChange;

  constructor(public payload: { params?: any, path: string }) {
  }

}

export type RouterAction = RouterBack
  | RouterForward
  | RouteChange;
