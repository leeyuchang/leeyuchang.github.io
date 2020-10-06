export default class Pageable {

  constructor(page) {
    this.page = page <= 0 ? 0 : page;
  }
  get previousOrFirst() {
    return this.page <= 0 ? this : new Pageable(this.page - 1);
  }
  get next() {
    return new Pageable(this.page + 1);
  }
  get getPageNumber() {
    return this.page;
  }
}