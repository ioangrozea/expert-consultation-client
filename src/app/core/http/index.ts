import { AuthenticationApiService } from '@app/core/http/authentication-api.service';
import { UsersApiService } from '@app/core/http/users-api.service';


export const httpServices: any[] = [
  AuthenticationApiService,
  UsersApiService,
];

export * from './authentication-api.service';
export * from './users-api.service';
