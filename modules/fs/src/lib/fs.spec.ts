import { fs } from './fs.js';

describe('fs', () => {
  it('should work', () => {
    expect(fs()).toEqual('fs');
  });
});
