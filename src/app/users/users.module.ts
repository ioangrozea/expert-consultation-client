import { NgModule } from '@angular/core';
// modules
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
// containers
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';
import { AddUserComponent } from './containers/add-user/add-user.component';
import { AddSingleUserComponent } from './containers/add-single-user/add-single-user.component';
import { UserSubscribeFormComponent } from './components/user-subscribe-form/user-subscribe-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [
    ...fromContainers.components,
    ...fromComponents.components,
    AddUserComponent,
    AddSingleUserComponent,
    UserSubscribeFormComponent
  ],
  providers: [
    ...fromGuards.guards,
  ]
})
export class UsersModule {
}
