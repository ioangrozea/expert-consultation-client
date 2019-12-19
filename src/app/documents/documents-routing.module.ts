import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.DocumentsComponent,
  },
  {
    path: ':documentId/breakdown',
    component: fromContainers.DocumentBreakdownComponent,
  },
  {
    path: 'add',
    component: fromContainers.AddDocumentComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DocumentsRoutingModule {
}
