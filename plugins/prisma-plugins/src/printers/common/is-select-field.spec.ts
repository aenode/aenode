import type { DMMF } from '@prisma/generator-helper';
import { isSelectField } from './is-field.js';

describe('isSelectField', () => {
  it.each`
    field                                                         | expected
    ${{ kind: 'object', documentation: '@select' } as DMMF.Field} | ${true}
    ${{ kind: 'object', documentation: '' } as DMMF.Field}        | ${false}
  `('isSelectField($field) -> $expected', ({ field, expected }) => {
    expect(isSelectField(field)).toEqual(expected);
  });
});
