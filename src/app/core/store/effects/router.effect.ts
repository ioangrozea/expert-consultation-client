import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {ActivationEnd, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {filter, map, tap} from "rxjs/operators";
import * as routerActions from "@app/core/store/actions/router.actions";
import {RouteChange} from "@app/core/store/actions/router.actions";
import {Location} from '@angular/common';

@Injectable()
export class RouterEffects {

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.pipe(
    ofType(routerActions.RouterType.RouterBack),
    tap(() => this.location.back())
  );

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.pipe(
    ofType(routerActions.RouterType.RouterForward),
    tap(() => this.location.forward())
  );

  @Effect({dispatch: false})
  navigateTo$ = this.actions$.pipe(
    ofType(routerActions.RouterType.RouteChange),
    map((action: RouteChange) => action.payload),
    tap((payload) => this.router.navigate([payload.path]))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {
    this.listenToRouter();
  }

  private listenToRouter() {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd)
    ).subscribe((event: ActivationEnd) =>
      this.store.dispatch(new RouteChange({
        path: event.snapshot.routeConfig.path
      }))
    );
  }
}
