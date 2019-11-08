import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, PageData, User } from '@app/core';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users$: Observable<User[]> = this.store.pipe(select(fromStore.getUsers));
  public usersPageData$: Observable<PageData> = this.store.pipe(select(fromStore.getUsersPageData));
  private usersLoaded$: Observable<boolean> = this.store.pipe(select(fromStore.getUsersLoaded));
  private filter$: Observable<Filter> = this.store.pipe(select(fromStore.getUsersFilter));

  constructor(private store: Store<CoreState>,
              private router: Router) {
  }

  public onFilterChange(filter: Filter) {
    this.store.dispatch(new fromStore.LoadUsers(filter));
  }

  public onButtonClicked() {
    this.router.navigate(['/users/add']);
  }
}
