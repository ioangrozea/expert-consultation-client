export class PageData {
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;

  constructor(otherPage: Page<any>) {
    this.first = otherPage.first;
    this.last = otherPage.last;
    this.number = otherPage.number;
    this.numberOfElements = otherPage.numberOfElements;
    this.size = otherPage.size;
    this.totalElements = otherPage.totalElements;
    this.totalPages = otherPage.totalPages;
  }
}

export class Page<T> extends PageData {
  content: T[];

  constructor(otherPage: Page<any>) {
    super(otherPage);
    this.content = [];
  }
}
