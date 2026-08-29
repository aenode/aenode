import type { DMMF } from '@prisma/generator-helper';
import { isInternalField } from './is-field.js';

describe('isInternalField', () => {
  it.each`
    field                                           | expected
    ${{ documentation: '@internal' } as DMMF.Field} | ${true}
    ${{} as DMMF.Field}                             | ${false}
  `('isInternalField($field) -> $expected', ({ field, expected }) => {
    expect(isInternalField(field)).toEqual(expected);
  });
});
