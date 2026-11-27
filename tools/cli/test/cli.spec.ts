import { cli } from '../src/lib/cli.js';

describe('cli', () => {
  it('should work', () => {
    expect(cli()).toEqual('cli');
  });
});
