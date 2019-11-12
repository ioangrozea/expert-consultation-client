import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as routerActions from '@app/core/store/actions/router.actions';
import { RouteChange } from '@app/core/store/actions/router.actions';

@Injectable()
export class RouterEffects {

  @Effect({dispatch: false})
  navigateTo$ = this.actions$.pipe(
    ofType(routerActions.RouterType.RouteChange),
    tap((action: RouteChange) => this.router.navigate([action.payload.path], action.payload.params)));

  constructor(
    private actions$: Actions,
    private router: Router) {
  }
}
