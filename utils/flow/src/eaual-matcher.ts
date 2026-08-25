export class EqualMatcher<V, T, R extends T = T> {
  protected handler?: () => V;

  constructor(protected readonly actualValue: T) {}

  isEqualTo<C extends R>(
    value: C,
    thenHandler: (value: C) => V,
  ): EqualMatcher<V, T, Exclude<R, C>> {
    if (value === this.actualValue) {
      this.handler = () => thenHandler(value);
    }

    return this as unknown as EqualMatcher<V, T, Exclude<R, C>>;
  }

  collect(): V | undefined {
    return this.handler?.();
  }
}
