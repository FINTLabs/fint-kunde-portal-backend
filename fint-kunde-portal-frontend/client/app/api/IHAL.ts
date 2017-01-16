export interface IHAL {
  _links: {
    self: {href: string};
    first: {href: string};
    last: {href: string};
    next: {href: string};
    prev: {href: string};
  },
  page: number;
  page_count: number;
  page_size: number;
  total_items: number;
}
