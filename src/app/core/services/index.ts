import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

export const services: any[] = [AuthenticationService, UserService];

export * from './authentication.service';
export * from './user.service';
