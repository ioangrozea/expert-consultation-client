import { DocumentsComponent } from './documents/documents.component';
import { DocumentBreakdownComponent } from '@app/documents/containers/document-breakdown/document-breakdown.component';
import { AddDocumentComponent } from '@app/documents/containers/add-document/add-document.component';

export const components: any[] = [
  DocumentsComponent,
  DocumentBreakdownComponent,
  AddDocumentComponent,
];

export * from './documents/documents.component';
export * from './document-breakdown/document-breakdown.component';
export * from './add-document/add-document.component';
