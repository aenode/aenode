import { merge } from './is.js';

describe('merge', () => {
  it('should merge', () => {
    expect(
      merge<{ some?: string; other?: string }>(
        { some: 'some' },
        { other: 'other' },
      ),
    ).toEqual({ some: 'some', other: 'other' });

    expect(
      merge<{ some?: string; other?: string }>(
        { some: 'some' },
        { some: undefined, other: 'other' },
      ),
    ).toEqual({ some: 'some', other: 'other' });
    expect(
      merge<{ some?: string | null; other?: string }>(
        { some: 'some' },
        { some: null, other: 'other' },
      ),
    ).toEqual({ some: 'some', other: 'other' });
  });
});
