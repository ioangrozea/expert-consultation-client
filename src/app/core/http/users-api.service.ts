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
    const params = new HttpParams()
      .set('page', filter.pageNumber.toString())
      .set('sort', `${filter.sortField},${filter.sortDirection}`);

    return this.http.get<any>(`${environment.api_url}/users`, {params})
      .pipe(
        catchError(aError => observableThrowError(aError))
      );
  }

  public save(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.api_url}/users`, user, {})
      .pipe(
        catchError(aError => observableThrowError(aError))
      );
  }

}
