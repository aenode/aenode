export class BaseDtoClass<T> {
  constructor(value: T) {
    Object.assign(this, value);
  }
}
