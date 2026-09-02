import type { DMMF } from '@prisma/generator-helper';
import { hasReadonlyAnnotation } from './is-field.js';

describe('isReadOnlyField', () => {
  it.each`
    field                                           | expected
    ${{ documentation: '@readonly' } as DMMF.Field} | ${true}
    ${{ documentation: '@readOnly' } as DMMF.Field} | ${true}
    ${{} as DMMF.Field}                             | ${false}
  `('isReadOnlyField($field) -> $expected', ({ field, expected }) => {
    expect(hasReadonlyAnnotation(field)).toEqual(expected);
  });
});
