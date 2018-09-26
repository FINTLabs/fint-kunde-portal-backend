class Sort {

  static alphabetically(a, b) {
    if (a.description) {
      if (a.description < b.description) return -1;
      else if (a.description > b.description) return 1;
      return 0;
    }
    if (a.shortDescription) {
      if (a.shortDescription < b.shortDescription) return -1;
      else if (a.shortDescription > b.shortDescription) return 1;
      return 0;
    }
  }
}

export default Sort;
