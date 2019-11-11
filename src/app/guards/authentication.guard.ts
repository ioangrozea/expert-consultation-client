import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationApiService} from '@app/core/http';
import {Store} from "@ngrx/store";
import * as fromStore from "@app/core/store";
import {CoreState} from "@app/core/store";

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationApiService: AuthenticationApiService,
    private store: Store<CoreState>
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationApiService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.store.dispatch(new fromStore.RouteChange({
      path: '/login',
      params: {
        queryParams:
          {returnUrl: state.url}
      }
    }));
    return false;
  }
}
