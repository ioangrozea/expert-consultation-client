import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {I18nError} from '@app/core/http/errors/i18n-error';
import {Tools} from '@app/shared/utils/tools';
import {AuthenticationApiService} from '@app/core/http';
import {LoginRequest} from '@app/core/models';
import * as fromStore from "@app/core/store";
import {CoreState} from "@app/core/store";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginRequest: LoginRequest;
  returnUrl: string;

  public logInForm = new FormGroup({
    usernameOrEmail: new FormControl('',),
    password: new FormControl('', [Validators.required]),
  });
  generalErrors: I18nError[];

  constructor(private route: ActivatedRoute,
              private authenticationApiService: AuthenticationApiService,
              private store: Store<CoreState>) {
    // redirect to home if already logged in
    if (this.authenticationApiService.currentUserValue) {
      this.store.dispatch(new fromStore.RouteChange({path: '/'}));
    }
  }

  ngOnInit() {
    this.logInForm.valueChanges.subscribe((request) => {
      this.loginRequest = new LoginRequest();
      this.loginRequest.fromForm(request);
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onSubmit() {
    for (const control in this.logInForm.controls) {
      if (this.logInForm.controls.hasOwnProperty(control)) {
        this.logInForm.controls[control].markAsUntouched();
        this.logInForm.controls[control].setErrors({});
      }
    }

    this.authenticationApiService.login(this.loginRequest)
      .subscribe({
        next: () => this.store.dispatch(new fromStore.RouteChange({path: this.returnUrl})),
        error: errors => {
          this.generalErrors = Tools.safeGet(() => errors.error.i18nErrors);
          const i18nFieldErrors: Map<string, I18nError> = Tools.safeGet(() => errors.error.i18nFieldErrors);
          if (!i18nFieldErrors) {
            return;
          }
          Object.keys(i18nFieldErrors).forEach((field: string) => {
            const control: AbstractControl = Tools.safeGet(() => this.logInForm.controls[field]);
            if (!control) {
              return;
            }
            control.markAsTouched();
            control.setErrors({
              [i18nFieldErrors[field].i18nErrorKey]: i18nFieldErrors[field].i18nErrorArguments
            });
          });
        }
      });
  }

  signUp() {
    this.store.dispatch(new fromStore.RouteChange({path: 'authentication/sign-up'}));
  }
}
