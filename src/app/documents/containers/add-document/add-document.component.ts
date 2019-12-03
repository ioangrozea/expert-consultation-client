import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CoreState } from '@app/core/store';
import * as fromStore from '@app/documents/store';
import { DocumentMetadata } from '@app/documents/models/document-metadata.model';
import { DocumentType } from '@app/documents/types/enums';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {
  url = '/file';
  title: string;
  documentNumber: number;
  initiator: string;
  documentType: string;
  releaseDate: string;
  receivingDate: string;
  formIncomplete: boolean;

  constructor(private store$: Store<CoreState>) {}

  public onSave() {}

  saveDocument(): boolean {
    const document = new DocumentMetadata();
    document.documentInitializer = this.initiator;
    document.documentNumber = this.documentNumber;
    document.documentType = DocumentType.OUG;
    document.documentTitle = this.title;
    document.dateOfReceipt = new Date(this.receivingDate);
    document.dateOfDevelopment = new Date(this.releaseDate);
    this.store$
      .pipe(select(fromStore.getFilePath))
      .pipe(map((filePath: string) => (document.filePath = filePath)));
    this.store$.dispatch(new fromStore.SaveDocument(document));
    return false;
  }

  isFormValid() {
    this.formIncomplete =
      !this.title ||
      !this.documentNumber ||
      !this.initiator ||
      !this.documentType ||
      !this.releaseDate ||
      !this.receivingDate;
  }
}
