import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  private csv: boolean;
  private excel: boolean;

  private optionSelected: boolean;

  constructor(private router: Router,
              private store: Store<CoreState>) {
  }

  ngOnInit() {
  }

  private redirectToAddSingleUser() {
    this.router.navigate(['/users/add/single'])
  }

  private userOptionSelected() {
    this.optionSelected = true;
  }

  private selectOption1() {
    this.csv = true;
    this.excel = false;
  }

  private selectOption2() {
    this.csv = false;
    this.excel = true;
  }

  private save(usersExcel: string) {
    this.store.dispatch(new fromStore.SaveUsersExcel(usersExcel));
  }

}
