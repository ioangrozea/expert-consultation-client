import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Filter, PageData, User } from '@app/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { merge, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() users: User[];
  @Input() pageData: PageData;
  @Input() filter: Filter;

  @Output() onFilterChange: EventEmitter<Filter> = new EventEmitter();

  public tableConfig: any;
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.tableConfig = {
      displayedColumns: [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'district',
        'organisation',
      ],
    };

    this.refresh();
  }

  ngAfterViewInit() {
    if (this.tableConfig.dataSource) {
      this.tableConfig.dataSource.sort = this.sort;
      this.tableConfig.dataSource.paginator = this.paginator;
    }

    if (this.sort && this.paginator) {
      // TODO make sure that this runs only once
      this.subscriptions.add(this.sort.sortChange.subscribe((sort: Sort) => {
        this.paginator.pageIndex = 0;
        this.onFilterChange.emit(this.getFilter());
      }));
      //
      // this.subscriptions.add(this.paginator.page.subscribe((page: PageEvent) => {
      //   this.onPageNumberChange.emit(page.pageIndex);
      // }));

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          switchMap(() => {
            this.onFilterChange.emit(this.getFilter());
            return of([]);
          }),
        ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private refresh() {
    if (this.users && this.users.length > 0) {
      this.tableConfig.dataSource = new MatTableDataSource(this.users);
      this.ngAfterViewInit();
    }
  }

  private getFilter(): Filter {
    const filter = new Filter();
    filter.pageNumber = this.paginator.pageIndex;
    filter.sortField = this.sort.active;
    filter.sortDirection = this.sort.direction.toString();

    return filter;
  }

}
