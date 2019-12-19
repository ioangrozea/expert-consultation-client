import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// pages
import { UsersComponent } from './containers';
import { UsersGuard } from '@app/users/guards';
import { AddUserComponent } from '@app/users/containers/add-user/add-user.component';
import { AddSingleUserComponent } from '@app/users/containers/add-single-user/add-single-user.component';
import { ImportCsvComponent } from '@app/users/containers/import-csv/import-csv.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [
      UsersGuard,
    ],
  },
  {
    path: 'add',
    component: AddUserComponent
  },
  {
    path: 'add/single',
    component: AddSingleUserComponent
  },
  {
    path: 'add/csv',
    component: ImportCsvComponent
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
export class UsersRoutingModule {
}
