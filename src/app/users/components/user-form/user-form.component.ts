import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '@app/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input()
  public user: User;
  @Output()
  public save: EventEmitter<User> = new EventEmitter();
  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  public userForm = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}|[+]?[0-9]{11}')]),
    district: new FormControl('', [Validators.required]),
    organisation: new FormControl('', [Validators.required]),
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
  }

  public onCancel() {
    this.cancel.emit();
  }
}