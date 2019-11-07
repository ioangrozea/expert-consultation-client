import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Filter, IUser } from '@app/core';
import { Page } from '@app/core/models/page.model';

@Injectable()
export class UsersApiService {
  constructor(private http: HttpClient) {
  }

  public list(filter: Filter): Observable<Page<IUser>> {
    let params = new HttpParams();
    params = params.set('page', filter.pageNumber.toString());
    params = params.set('sort', `${filter.sortField},${filter.sortDirection}`);

    return this.http.get<any>(`${environment.api_url}/users`, {params})
      .pipe(
        catchError(aError => observableThrowError(aError))
      );
  }
}
