import type { DMMF } from '@prisma/generator-helper';
import { hasInternalAnnotation } from './is-field.js';

describe('isInternalField', () => {
  it.each`
    field                                           | expected
    ${{ documentation: '@internal' } as DMMF.Field} | ${true}
    ${{} as DMMF.Field}                             | ${false}
  `('isInternalField($field) -> $expected', ({ field, expected }) => {
    expect(hasInternalAnnotation(field)).toEqual(expected);
  });
});
