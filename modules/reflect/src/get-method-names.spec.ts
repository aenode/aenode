import { getMethodNames } from './get-method-names.js';

describe('getMethodNames', () => {
  it('should get method names', () => {
    class Sample {
      name: string;
    }
    expect(getMethodNames(Sample)).toEqual(['name']);
  });
});
