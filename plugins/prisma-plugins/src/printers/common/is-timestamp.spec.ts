import type { DMMF } from '@prisma/generator-helper';
import { isTimestampField } from './is-field.js';

describe('isTimestampField', () => {
  it.each`
    field                                  | expected
    ${{ name: 'createdat' } as DMMF.Field} | ${true}
    ${{ name: 'createdAt' } as DMMF.Field} | ${true}
    ${{} as DMMF.Field}                    | ${false}
  `('isTimestampField($field) -> $expected', ({ field, expected }) => {
    expect(isTimestampField(field)).toEqual(expected);
  });
});
