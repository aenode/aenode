import { normalizeName } from '../src/lib/normalize-name.js';

describe('normalizeName', () => {
  it.each`
    value                       | result
    ${'name'}                   | ${'name'}
    ${'Name'}                   | ${'name'}
    ${'NAME'}                   | ${'name'}
    ${'nameName'}               | ${'name-name'}
    ${'NameName'}               | ${'name-name'}
    ${'Name Name'}              | ${'name-name'}
    ${'NAME NAME'}              | ${'name-name'}
    ${'NAME-NAME'}              | ${'name-name'}
    ${'NAME_NAME'}              | ${'name-name'}
    ${'   NAME:    NAME      '} | ${'name:-name'}
  `('normalizeName($value) return $result', ({ value, result }) => {
    expect(normalizeName(value)).toEqual(result);
  });
});
