import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserState } from '@app/core/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../../core/store';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private store: Store<UserState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getUsersLoaded))
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.store.dispatch(new fromStore.LoadUsers());
          }
        }),
        filter(loaded => loaded),
        take(1)
      );
  }
}
