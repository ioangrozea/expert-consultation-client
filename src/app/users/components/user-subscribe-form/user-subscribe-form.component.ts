import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-subscribe-form',
  templateUrl: './user-subscribe-form.component.html',
  styleUrls: ['./user-subscribe-form.component.scss']
})
export class UserSubscribeFormComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  foreName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}|[+]?[0-9]{11}")]);
  county = new FormControl('', [Validators.required]);
  organization = new FormControl('', [Validators.required]);

  constructor() {
  }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPhoneErrorMessage() {
    return this.phone.hasError('required') ? 'You must enter a value' :
      this.phone.hasError('pattern') ? 'Not a valid number' :
        '';
  }

  getJudetErrorMessage() {
    return this.county.hasError('required') ? 'You must enter a value' : '';
  }

  getNumeErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  getPrenumeErrorMessage() {
    return this.foreName.hasError('required') ? 'You must enter a value' : '';
  }

  getOrganizationErrorMessage() {
    return this.organization.hasError('required') ? 'You must enter a value' : '';
  }
}
