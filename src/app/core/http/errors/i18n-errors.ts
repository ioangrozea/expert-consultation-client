import { I18nError } from './i18n-error';

export class I18nErrors {
  i18nErrors: I18nError[];
  i18nFieldErrors: Map<string, I18nError>;
  additionalInfo: string;
}
