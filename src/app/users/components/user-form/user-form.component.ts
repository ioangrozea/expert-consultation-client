import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/core';
import { Error, ErrorMessage } from '@app/core/models/error.model';
import 'rxjs-compat/add/observable/of';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  public user: User;
  @Input()
  public error: Error;
  @Output()
  public save: EventEmitter<User> = new EventEmitter();
  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  public userForm = new FormGroup({
    lastName: new FormControl('', [Validators.required, Validators.max(40)]),
    firstName: new FormControl('', [Validators.required, Validators.max(40)]),
    email: new FormControl('', [Validators.required, Validators.email], this.validateEmailNotTaken.bind(this)),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}|[+]?[0-9]{11}')]),
    district: new FormControl('', [Validators.required, Validators.max(40)]),
    organisation: new FormControl('', [Validators.required, Validators.max(40)]),
  });

  ngOnInit(): void {
    this.userForm.patchValue(this.user.toFormData());
  }

  public getEmailErrorMessage() {
    return this.userForm.controls.email.hasError('required')
      ? 'required' : this.userForm.controls.email.hasError('email')
        ? 'email' : '';
  }

  public getPhoneErrorMessage() {
    return this.userForm.controls.phoneNumber.hasError('required')
      ? 'required' : this.userForm.controls.phoneNumber.hasError('pattern')
        ? 'phoneNumber' : '';
  }

  public onSave() {
    const editedUser = new User();
    editedUser.id = this.user.id;
    editedUser.fromFormData(this.userForm.value);
    this.save.emit(editedUser);
    this.userForm.controls.email.markAsTouched();
    console.log(this.userForm.get('email').errors);
    console.log(this.userForm.errors);
  }

  public onCancel() {
    this.cancel.emit();
  }



  validateEmailNotTaken(): Observable<{[key : string] : any}>  {
    return new Observable(observer => {
      if(this.emailAlreadyExists())
        observer.next({emailTaken: true});
      else
        observer.next(null);
    })
  }

  emailAlreadyExists(): boolean{
    return  this.generateErrorArray(this.error).filter((errorMessages) => errorMessages.i18nErrorKey === ErrorMessage.email).length > 0
  }


  /*  public duplicatedEmail(): boolean {
      if (this.error) {
        let errorMessages = this.generateErrorArray(this.error);
        var anies = errorMessages.filter((errorMessages) => errorMessages.i18nErrorKey === ErrorMessage.email);
        return anies.length > 0;
      }

    }*/

  public generateErrorArray(object: any) {
    return Object.keys(object).map((key) => object[key]);
  }
}

/*
export class UsernameEmailValidator {

  constructor() {}

  static checkEmail(control: AbstractControl) {
    return checkUser(control, 'email');
  }
}
*/
