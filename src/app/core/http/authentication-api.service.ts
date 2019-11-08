import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { LoginRequest, User, UserRequest } from '../models';
import { AuthenticationService } from '@app/core/services';

@Injectable({providedIn: 'root'})
export class AuthenticationApiService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.authenticationService.getCurrentUser()));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginRequest>(`${environment.api_url}/auth/signin`, loginRequest)
      .pipe(map((auth: any) => {
        // login successful if there's a jwt token in the response
        if (auth && auth.accessToken) {
          // store auth details and jwt token in local storage to keep user logged in between page refreshes
          this.authenticationService.setCurrentUser(auth);
          this.currentUserSubject.next(auth);
        }

        return auth;
      }));
  }

  signup(signupForm: UserRequest) {
    return this.http.post<UserRequest>(`${environment.api_url}/auth/signup`, signupForm);
  }

  logout() {
    this.authenticationService.removeCurrentUser();
    this.currentUserSubject.next(null);
  }
}
