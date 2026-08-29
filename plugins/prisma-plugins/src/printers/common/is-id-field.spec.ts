import type { DMMF } from '@prisma/generator-helper';
import { isIdField } from './is-field.js';

describe('isIdField', () => {
  it.each`
    field                                                        | expected
    ${{ name: 'some', isId: true } as DMMF.Field}                | ${true}
    ${{ name: 'some', default: { name: 'uuid' } } as DMMF.Field} | ${true}
    ${{ name: 'some' } as DMMF.Field}                            | ${false}
    ${{ name: 'uuid' } as DMMF.Field}                            | ${false}
    ${{ name: 'id' } as DMMF.Field}                              | ${false}
  `('isIdField($field) -> $expected', ({ field, expected }) => {
    expect(isIdField(field)).toEqual(expected);
  });
});
