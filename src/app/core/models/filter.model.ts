export class IFilter {
  pageNumber: number;
  sortField: string;
  sortDirection: string;
  searchTerm: string;
}

export class Filter {
  pageNumber: number;
  sortField: string;
  sortDirection: string;
  searchTerm: string;

  fromJson(json: IFilter) {
    this.pageNumber = json.pageNumber;
    this.sortField = json.sortField;
    this.sortDirection = json.sortDirection;
    this.searchTerm = json.searchTerm;
  }

  toJson(): IFilter {
    return {
      pageNumber: this.pageNumber,
      sortField: this.sortField,
      sortDirection: this.sortDirection,
      searchTerm: this.searchTerm,
    } as IFilter;
  }
}
