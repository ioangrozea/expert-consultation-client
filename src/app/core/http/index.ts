import { AuthenticationApiService } from './authentication-api.service';
import { UserApiService } from './user-api.service';

export const httpServices: any[] = [AuthenticationApiService, UserApiService];

export * from './authentication-api.service';
export * from './user-api.service';
