import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

import { environment } from '@env/environment.local';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(environment.api_url)) {
      return next.handle(request);
    }

    const modified = request.clone({
      setHeaders: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      }
    });

    return next.handle(modified);
  }
}
