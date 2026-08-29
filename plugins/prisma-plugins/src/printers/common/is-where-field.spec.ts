import type { DMMF } from '@prisma/generator-helper';
import { isWhereField } from './is-field.js';

describe('isWhereField', () => {
  it.each`
    field                                                        | expected
    ${{ kind: 'object', documentation: '@where' } as DMMF.Field} | ${true}
    ${{ kind: 'object', documentation: '' } as DMMF.Field}       | ${false}
    ${{ kind: 'object' } as DMMF.Field}                          | ${false}
  `('isWhereField($field) -> $expected', ({ field, expected }) => {
    expect(isWhereField(field)).toEqual(expected);
  });
});
