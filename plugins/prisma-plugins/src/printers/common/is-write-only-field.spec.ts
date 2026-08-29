import type { DMMF } from '@prisma/generator-helper';
import { isWriteOnlyField } from './is-field.js';

describe('isWriteOnlyField', () => {
  it.each`
    field                                            | expected
    ${{ documentation: '@writeOnly' } as DMMF.Field} | ${true}
    ${{ documentation: '@writeonly' } as DMMF.Field} | ${true}
    ${{ documentation: '@WriteOnly' } as DMMF.Field} | ${true}
    ${{ documentation: '' } as DMMF.Field}           | ${false}
    ${{} as DMMF.Field}                              | ${false}
  `('isWriteOnlyField($field) -> $expected', ({ field, expected }) => {
    expect(isWriteOnlyField(field)).toEqual(expected);
  });
});
