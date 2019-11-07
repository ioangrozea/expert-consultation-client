import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// pages
import { UsersComponent } from './containers';
import { UsersGuard } from '@app/users/guards';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [
      UsersGuard,
    ],
  },
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
