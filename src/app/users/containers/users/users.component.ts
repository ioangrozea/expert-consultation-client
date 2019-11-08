import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Filter, PageData, User} from '@app/core';
import * as fromStore from '@app/core/store';
import {CoreState} from '@app/core/store';
import {select, Store} from '@ngrx/store';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  public usersPageData$: Observable<PageData>;
  private usersLoaded$: Observable<boolean>;
  private filter$: Observable<Filter>;

  constructor(private store: Store<CoreState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.usersLoaded$ = this.store.pipe(select(fromStore.getUsersLoaded));
    this.filter$ = this.store.pipe(select(fromStore.getUsersFilter));
    this.users$ = this.store.pipe(select(fromStore.getUsers));
    this.usersPageData$ = this.store.pipe(select(fromStore.getUsersPageData));
  }

  public onFilterChange(filter: Filter) {
    this.store.dispatch(new fromStore.LoadUsers(filter));
  }

  public onButtonClicked() {
    this.router.navigate(["/users/add"]);
  }
}
