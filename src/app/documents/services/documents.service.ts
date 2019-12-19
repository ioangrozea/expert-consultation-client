import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '@app/core';
import { DocumentsApiService } from '@app/documents/http';
import { DocumentConsolidate, IDocumentConsolidate } from '@app/documents/models/document-consolidate.model';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { map } from 'rxjs/operators';
import { DocumentMetadata, IDocumentMetadata } from '@app/documents/models/document-metadata.model';

@Injectable()
export class DocumentsService {

  constructor(
    private documentsApiService: DocumentsApiService,
    private store: Store<fromStore.DocumentsState>
  ) {

  }

  public list(): Observable<Page<DocumentConsolidate>> {
    return this.documentsApiService.list()
      .pipe(map(value => this.mapPage(value)));
  }

  public save(documentMetadata: DocumentMetadata): Observable<DocumentMetadata> {
    return this.documentsApiService
        .post(documentMetadata.toJson())
        .pipe(
            map((iDocument: IDocumentMetadata) => new DocumentMetadata(iDocument))
        );
  }

  private mapPage(userPage: Page<IDocumentConsolidate>): Page<DocumentConsolidate> {
    const result = new Page<DocumentConsolidate>(userPage);
    result.content = userPage.content.map(this.fromResponse);
    return result;
  }

  private fromResponse(documentResponse: IDocumentConsolidate): DocumentConsolidate {
    return new DocumentConsolidate(documentResponse);
  }
}
