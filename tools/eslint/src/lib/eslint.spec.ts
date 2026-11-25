import { eslint } from './eslint.js';

describe('eslint', () => {
  it('should work', () => {
    expect(eslint()).toEqual('eslint');
  });
});
