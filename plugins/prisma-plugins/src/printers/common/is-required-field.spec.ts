import type { DMMF } from '@prisma/generator-helper';
import { isRequiredField } from './is-field.js';

describe('isRequiredField', () => {
  it.each`
    field                                                                              | expected
    ${{ name: 'name', kind: 'scalar', documentation: '@required' } as DMMF.Field}      | ${true}
    ${{ name: 'name', kind: 'enum', documentation: '@required' } as DMMF.Field}        | ${true}
    ${{ name: 'name', kind: 'unsupported', documentation: '@required' } as DMMF.Field} | ${true}
    ${{ name: 'name', kind: 'object', documentation: '@required' } as DMMF.Field}      | ${true}
    ${{ name: 'name', kind: 'object', isRequired: true } as DMMF.Field}                | ${false}
    ${{ name: 'name', kind: 'scalar', isRequired: true } as DMMF.Field}                | ${true}
    ${{ name: 'name', kind: 'enum', isRequired: true } as DMMF.Field}                  | ${true}
    ${{ name: 'name', kind: 'unsupported', isRequired: true } as DMMF.Field}           | ${true}
    ${{ name: 'name', kind: 'scalar', isRequired: false } as DMMF.Field}               | ${false}
    ${{ name: 'name', kind: 'enum', isRequired: false } as DMMF.Field}                 | ${false}
    ${{ name: 'name', kind: 'unsupported', isRequired: false } as DMMF.Field}          | ${false}
    ${{ name: 'name', kind: 'scalar', documentation: '' } as DMMF.Field}               | ${false}
  `('isRequiredField($field) -> $expected', ({ field, expected }) => {
    expect(isRequiredField(field)).toEqual(expected);
  });
});
