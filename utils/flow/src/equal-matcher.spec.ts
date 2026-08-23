import { EqualMatcher } from './eaual-matcher.js';

describe('EnumMatcher', () => {
  const fn0 = vi.fn();
  const fn1 = vi.fn();
  const fn2 = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('should work', () => {
    type Num = '0' | '1' | '2';

    function some(value: Num) {
      new EqualMatcher(value)
        .isEqualTo('0', fn0)
        .isEqualTo('1', fn1)
        .isEqualTo('2', fn2)
        .done();
    }

    some('0');
    expect(fn0).toHaveBeenCalledExactlyOnceWith('0');
    some('1');
    expect(fn1).toHaveBeenCalledExactlyOnceWith('1');
  });
});
