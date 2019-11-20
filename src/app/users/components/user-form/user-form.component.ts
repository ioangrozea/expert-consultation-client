import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/core';
import { Error } from '@app/core/models/error.model';
import 'rxjs-compat/add/observable/of';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

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
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}|[+]?[0-9]{11}')]),
    district: new FormControl('', [Validators.required, Validators.max(40)]),
    organisation: new FormControl('', [Validators.required, Validators.max(40)]),
  });

  ngOnInit(): void {
    this.userForm.patchValue(this.user.toFormData());
  }

  public getEmailErrorMessage() {
    return this.userForm.controls.email.hasError('required')
      ? 'required' : this.userForm.controls.email.hasError('emailTaken')
        ? 'email.duplicated' : this.userForm.controls.email.hasError('email')
          ? 'email.invalid' : '';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['error'].currentValue.email) {
      this.userForm.controls.email.setErrors({emailTaken: true});
    }
  }
}
