import type { DMMF } from '@prisma/generator-helper';
import { isCreateDtoField } from './is-field.js';

describe('isCreateDtoField', () => {
  it.each`
    field                                                        | expected
    ${{ name: 'some', isId: true } as DMMF.Field}                | ${false}
    ${{ name: 'some', default: { name: 'uuid' } } as DMMF.Field} | ${false}
    ${{ name: 'createdat' } as DMMF.Field}                       | ${false}
    ${{ name: 'createdAt' } as DMMF.Field}                       | ${false}
    ${{ documentation: '@internal' } as DMMF.Field}              | ${false}
  `('isCreateDtoField($field) -> $expected', ({ field, expected }) => {
    expect(isCreateDtoField(field)).toEqual(expected);
  });
});
