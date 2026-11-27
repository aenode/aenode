import { names } from '../src/index.js';

describe('names', () => {
  it('should create names', () => {
    const n = names('   some name  ');

    expect(n.kebab).toEqual('some-name');
    expect(n.camel).toEqual('someName');
    expect(n.pascal).toEqual('SomeName');
    expect(n.constant).toEqual('SOME_NAME');
    expect(n.sentence).toEqual('Some name');
    expect(n.title).toEqual('Some Name');
    expect(n.snake).toEqual('some_name');
  });
});
