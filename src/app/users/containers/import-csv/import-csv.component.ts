import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CoreState } from '../../../core/store';
import * as fromStore from '@app/core/store';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent {
  private importedUsers$ = this.store.pipe(select(fromStore.getImportUsers));

  constructor(private store: Store<CoreState>) {
  }

}
