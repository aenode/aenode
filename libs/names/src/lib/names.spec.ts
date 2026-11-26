import { names } from './names.js';

describe('names', () => {
  it('should work', () => {
    const result = names('some');

    expect(result.camel).toEqual('some');
    expect(result.constant).toEqual('some');
    expect(result.kebab).toEqual('some');
  });
});
