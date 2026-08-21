import { UndefinedError } from './errors.js';

describe('errors', () => {
  it('should throw UndefinedError', () => {
    expect(() => {
      throw new UndefinedError();
    }).throw(UndefinedError);
  });
});
