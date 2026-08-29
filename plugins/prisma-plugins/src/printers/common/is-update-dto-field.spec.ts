import type { DMMF } from '@prisma/generator-helper';
import { isUpdateDtoField } from './is-field.js';

describe('isUpdateDtoField', () => {
  it.each`
    field                                                        | expected
    ${{ name: 'some', isId: true } as DMMF.Field}                | ${false}
    ${{ name: 'some', default: { name: 'uuid' } } as DMMF.Field} | ${false}
    ${{ name: 'createdat' } as DMMF.Field}                       | ${false}
    ${{ name: 'createdAt' } as DMMF.Field}                       | ${false}
    ${{ documentation: '@internal' } as DMMF.Field}              | ${false}
    ${{ documentation: '@readonly' } as DMMF.Field}              | ${false}
    ${{} as DMMF.Field}                                          | ${true}
  `('isUpdateDtoField($field) -> $expected', ({ field, expected }) => {
    expect(isUpdateDtoField(field)).toEqual(expected);
  });
});
