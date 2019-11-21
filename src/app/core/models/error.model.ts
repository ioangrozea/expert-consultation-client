export enum ErrorMessage {
  email = 'user.save.duplicatedEmail',
}

export interface Error {
  [fieldName: string]: string;
}
