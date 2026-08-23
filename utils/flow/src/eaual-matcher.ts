export class EqualMatcher<T, R extends T = T> {
  protected handler?: () => void;

  constructor(protected readonly actualValue: T) {}

  isEqualTo<C extends R>(
    value: C,
    thenHandler: (value: C) => void,
  ): EqualMatcher<T, Exclude<R, C>> {
    if (value === this.actualValue) {
      this.handler = () => thenHandler(value);
    }

    return this as unknown as EqualMatcher<T, Exclude<R, C>>;
  }

  done(this: EqualMatcher<T, never>): void {
    this.handler?.();
  }
}
