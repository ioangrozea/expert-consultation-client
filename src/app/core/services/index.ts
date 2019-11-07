import { AuthenticationService } from './authentication.service';
import { UsersService } from '@app/core/services/users.service';

export const services: any[] = [
  AuthenticationService,
  UsersService,
];

export * from './authentication.service';
export * from './users.service';
