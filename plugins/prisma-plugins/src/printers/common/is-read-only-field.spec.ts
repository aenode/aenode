import type { DMMF } from '@prisma/generator-helper';
import { isReadOnlyField } from './is-field.js';

describe('isReadOnlyField', () => {
  it.each`
    field                                           | expected
    ${{ documentation: '@readonly' } as DMMF.Field} | ${true}
    ${{ documentation: '@readOnly' } as DMMF.Field} | ${true}
    ${{} as DMMF.Field}                             | ${false}
  `('isReadOnlyField($field) -> $expected', ({ field, expected }) => {
    expect(isReadOnlyField(field)).toEqual(expected);
  });
});
