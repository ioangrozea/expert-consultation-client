import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  constructor(private router: Router) {
  }

  public redirectToAddSingleUser() {
    this.router.navigate(['/users/add/single']);
  }

}
