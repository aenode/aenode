export class PropertyMathcer<
  T extends object,
  C extends (...args: any[]) => any,
> {
  protected handlers: (() => C)[] = [];

  constructor(protected readonly actualValue: T) {}

  isDefined<K extends keyof T, V extends Exclude<T[K], null | undefined>>(
    key: K,
    thenHandler: (value: V) => C,
    elseHandler?: () => C,
  ): PropertyMathcer<Omit<T, K>, C> {
    const value = this.actualValue[key];
    if (value !== undefined && value !== null) {
      this.handlers.push(() => thenHandler(value as V));
    } else {
      if (elseHandler !== undefined && elseHandler !== null) {
        this.handlers.push(() => elseHandler());
      }
    }
    return this;
  }

  isTrue<K extends keyof T, V extends Exclude<T[K], null | undefined>>(
    key: K,
    thenHandler: (value: V) => C,
    elseHandler?: () => C,
  ): PropertyMathcer<Omit<T, K>, C> {
    const value = this.actualValue[key];
    if (value === true) {
      this.handlers.push(() => thenHandler(value as V));
    } else if (elseHandler !== undefined && elseHandler !== null) {
      this.handlers.push(() => elseHandler());
    }
    return this;
  }

  collect() {
    return this.handlers.map((d) => d());
  }
}
