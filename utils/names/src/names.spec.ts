import { InvalidNameError } from '@aenode/errors';
import { names } from './names.js';
describe('names', () => {
  describe('Valid', () => {
    it.each`
      type          | value
      ${'camel'}    | ${'someName'}
      ${'constant'} | ${'SOME_NAME'}
      ${'kebab'}    | ${'some-name'}
      ${'pascal'}   | ${'SomeName'}
      ${'sentence'} | ${'Some name'}
      ${'snake'}    | ${'some_name'}
      ${'title'}    | ${'Some Name'}
    `('From $type | names($value) ', ({ value }) => {
      const result = names(value);
      expect(result.camel).toEqual('someName');
      expect(result.constant).toEqual('SOME_NAME');
      expect(result.kebab).toEqual('some-name');
      expect(result.pascal).toEqual('SomeName');
      expect(result.sentence).toEqual('Some name');
      expect(result.snake).toEqual('some_name');
      expect(result.title).toEqual('Some Name');
    });
  });

  describe('invalid', () => {
    it.each`
      value
      ${1}
      ${true}
      ${{}}
      ${''}
      ${'  '}
      ${'%'}
      ${'1'}
      ${'1name'}
      ${' 1'}
      ${'$'}
    `('names($value) throws InvalidNameError', ({ value }) => {
      expect(() => names(value)).toThrow(InvalidNameError);
    });
  });
});
