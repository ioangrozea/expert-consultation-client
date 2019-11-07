import { UsersGuard } from '@app/users/guards/users.guard';

export const guards: any[] = [
  UsersGuard,
];

export * from './users.guard';
