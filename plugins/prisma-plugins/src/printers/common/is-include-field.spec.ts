import type { DMMF } from '@prisma/generator-helper';
import { isIncludeField } from './is-field.js';

describe('isIncludeField', () => {
  it.each`
    field                                                          | expected
    ${{ kind: 'object', documentation: '@include' } as DMMF.Field} | ${true}
    ${{ kind: 'object', documentation: '' } as DMMF.Field}         | ${false}
    ${{ kind: 'object' } as DMMF.Field}                            | ${false}
  `('isIncludeField($field) -> $expected', ({ field, expected }) => {
    expect(isIncludeField(field)).toEqual(expected);
  });
});
