import { token } from './token.js';

describe('token', () => {
  it('should create token', () => {
    expect(token('some', 'goes', '', '  ', 'SomeOther')).toEqual(
      'SOME_GOES_SOME_OTHER',
    );
  });
});
