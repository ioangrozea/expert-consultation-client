import { UsersComponent } from '@app/users/containers/users/users.component';
import { AddUserComponent } from '@app/users/containers/add-user/add-user.component';
import { AddSingleUserComponent } from '@app/users/containers/add-single-user/add-single-user.component';
import { ImportCsvComponent } from '@app/users/containers/import-csv/import-csv.component';

export const components: any[] = [
  UsersComponent,
  AddUserComponent,
  AddSingleUserComponent,
  ImportCsvComponent,
];

export * from './users/users.component';

