import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, PageData, User } from '@app/core';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  public usersPageData$: Observable<PageData>;
  private usersLoaded$: Observable<boolean>;

  constructor(private store: Store<CoreState>) {
  }

  ngOnInit(): void {
    this.usersLoaded$ = this.store.pipe(select(fromStore.getUsersLoaded));

    this.refresh();
  }

  public onFilterChange(filter: Filter) {
    this.store.dispatch(new fromStore.LoadUsers(filter));
  }

  private refresh() {
    this.users$ = this.store.pipe(select(fromStore.getUsers));
    this.usersPageData$ = this.store.pipe(select(fromStore.getUsersPageData));
  }
}
