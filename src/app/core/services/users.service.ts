import { Injectable } from '@angular/core';
import { UsersApiService } from '@app/core/http/users-api.service';
import { Observable } from 'rxjs';
import { IUser, Page, User } from '@app/core';
import { select, Store } from '@ngrx/store';
import { CoreState, getUsersFilter } from '@app/core/store';
import { map, mergeMap, take } from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(private usersApiService: UsersApiService,
              private store: Store<CoreState>) {
  }

  public list(): Observable<Page<User>> {
    return this.store.pipe(
      select(getUsersFilter),
      take(1),
      mergeMap(
        filter => this.usersApiService.list(filter).pipe(map((a) => this.mapPage(a)))
      ));
  }

  private fromResponse(userResponse: IUser): User {
    return new User(userResponse);
  }

  private mapPage(userPage: Page<IUser>): Page<User> {
    const result = new Page<User>(userPage);
    result.content = userPage.content.map(this.fromResponse);
    return result;
  }
}
