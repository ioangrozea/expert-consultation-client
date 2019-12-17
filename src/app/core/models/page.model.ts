export interface IPageData {
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export class PageData {
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;

  fromPage(otherPage: Page<any>) {
    this.fromJson(otherPage as IPageData);
  }

  fromJson(json: IPageData) {
    this.first = json.first;
    this.last = json.last;
    this.number = json.number;
    this.numberOfElements = json.numberOfElements;
    this.size = json.size;
    this.totalElements = json.totalElements;
    this.totalPages = json.totalPages;
  }

  toJson(): IPageData {
    return {
      first: this.first,
      last: this.last,
      number: this.number,
      numberOfElements: this.numberOfElements,
      size: this.size,
      totalElements: this.totalElements,
      totalPages: this.totalPages
    } as PageData;
  }
}

export class Page<T> extends PageData {
  content: T[];

  constructor(otherPage: Page<any>) {
    super();
    super.fromPage(otherPage);
    this.content = [];
  }
}
