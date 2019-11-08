import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Filter, PageData, User } from '@app/core';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { merge, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() users: User[];
  @Input() pageData: PageData;
  @Input() filter: Filter;
  @Input() loading: boolean;

  @Output() filterChange: EventEmitter<Filter> = new EventEmitter();

  public tableConfig: any = {};

  ngOnInit(): void {
    this.tableConfig = {
      displayedColumns: [
        'lastName',
        'firstName',
        'email',
        'phoneNumber',
        'district',
        'organisation',
      ],
    };
  }

  ngAfterViewInit() {
    if (this.sort && this.paginator) {
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          switchMap((filterChange: Sort | PageEvent) => {
            if (filterChange['active']) {
              this.paginator.pageIndex = 0;
            }

            this.filterChange.emit(this.getFilter());
            return of([]);
          }),
        ).subscribe();
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
