import { UploadFileEffects } from './file-upload.effect';
import { UsersEffects } from './users.effect';
import { ImportUsersEffects } from '@app/core/store/effects/import-users.effect';

export const effects: any[] = [
  UploadFileEffects,
  UsersEffects,
  ImportUsersEffects,
];

export * from './file-upload.effect';
export * from './users.effect';
export * from './import-users.effect';
