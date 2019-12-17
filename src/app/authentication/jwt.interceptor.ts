import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationApiService } from '@app/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationApiService: AuthenticationApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt accessToken if available
    const authData = this.authenticationApiService.authenticationDataValue;
    if (authData && authData.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authData.accessToken}`
        }
      });
    }
    return next.handle(request);
  }
}
