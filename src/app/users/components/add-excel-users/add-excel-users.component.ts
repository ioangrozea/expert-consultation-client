import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-excel-users',
  templateUrl: './add-excel-users.component.html',
  styleUrls: ['./add-excel-users.component.scss']
})
export class AddExcelUsersComponent {

  @Output()
  private save: EventEmitter<string> = new EventEmitter();
  private textValue: string;

  constructor() {
  }

  submitExcel() {
    this.save.emit(this.textValue);
  }
}
