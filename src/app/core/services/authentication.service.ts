import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authDataKey = 'authenticationData';

  setAuthenticationData(data) {
    localStorage.setItem(this.authDataKey, JSON.stringify(data));
  }

  getAuthenticationData() {
    return localStorage.getItem(this.authDataKey);
  }

  removeAuthenticationData() {
    localStorage.removeItem(this.authDataKey);
  }
}
