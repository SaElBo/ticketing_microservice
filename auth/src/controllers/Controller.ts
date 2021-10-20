
export default class Controller<T> {
  protected model : T;
  constructor(repo: T) {
    this.model = repo;
  }
}
