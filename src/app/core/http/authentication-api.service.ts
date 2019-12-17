import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { LoginRequest, UserRequest } from '../models';
import { AuthenticationService } from '../services/authentication.service';

export class AuthenticationData {
  public accessToken: string;
  public tokenType: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationApiService {
  public authenticationData: Observable<AuthenticationData>;
  private authenticationDataSubject: BehaviorSubject<AuthenticationData>;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationDataSubject = new BehaviorSubject<AuthenticationData>(
      JSON.parse(this.authenticationService.getAuthenticationData())
    );
    this.authenticationData = this.authenticationDataSubject.asObservable();
  }

  public get authenticationDataValue(): AuthenticationData {
    return this.authenticationDataSubject.value;
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post<AuthenticationData>(
        `${environment.api_url}/auth/signin`,
        loginRequest
      )
      .pipe(
        map((auth: AuthenticationData) => {
          // login successful if there's a jwt accessToken in the response
          if (auth && auth.accessToken) {
            // store auth details and jwt accessToken in local storage to keep user logged in between page refreshes
            this.authenticationService.setAuthenticationData(auth);
            this.authenticationDataSubject.next(auth);
          }

          return auth;
        })
      );
  }

  signup(signupForm: UserRequest) {
    return this.http.post<UserRequest>(
      `${environment.api_url}/auth/signup`,
      signupForm
    );
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.authenticationDataSubject.next(null);
  }
}
