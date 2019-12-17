import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// modules
import { SharedModule } from '../shared/shared.module';
import { DocumentsRoutingModule } from './documents-routing.module';

import * as fromContainer from './containers';
import * as fromService from './services';
import * as fromApiService from './http';
import * as fromStore from './store';

@NgModule({
  imports: [
    SharedModule,
    DocumentsRoutingModule,
    StoreModule.forFeature('documents', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
  ],
  declarations: [...fromContainer.components],
  providers: [...fromService.services, ...fromApiService.apiServices]
})
export class DocumentsModule {}
