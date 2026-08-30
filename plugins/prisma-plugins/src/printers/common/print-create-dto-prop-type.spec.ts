import type { DMMF } from '@prisma/generator-helper';
import { propType } from './dto-prop-type.js';

describe('printCreateDtoPropType', () => {
  it.each`
    field                                                                            | expected
    ${{ name: 'name', kind: 'scalar', type: 'String' } as DMMF.Field}                | ${'string'}
    ${{ name: 'name', kind: 'scalar', type: 'Int' } as DMMF.Field}                   | ${'number'}
    ${{ name: 'name', kind: 'scalar', type: 'Decimal' } as DMMF.Field}               | ${'number'}
    ${{ name: 'name', kind: 'scalar', type: 'Boolean' } as DMMF.Field}               | ${'boolean'}
    ${{ name: 'name', kind: 'scalar', type: 'Bool' } as DMMF.Field}                  | ${'boolean'}
    ${{ name: 'name', kind: 'enum', type: 'Some' } as DMMF.Field}                    | ${'P.$Enums.Some'}
    ${{ name: 'name', kind: 'scalar', type: 'String', isList: true } as DMMF.Field}  | ${'string[]'}
    ${{ name: 'name', kind: 'scalar', type: 'Int', isList: true } as DMMF.Field}     | ${'number[]'}
    ${{ name: 'name', kind: 'scalar', type: 'Decimal', isList: true } as DMMF.Field} | ${'number[]'}
    ${{ name: 'name', kind: 'scalar', type: 'Boolean', isList: true } as DMMF.Field} | ${'boolean[]'}
    ${{ name: 'name', kind: 'scalar', type: 'Bool', isList: true } as DMMF.Field}    | ${'boolean[]'}
    ${{ name: 'name', kind: 'enum', type: 'Some', isList: true } as DMMF.Field}      | ${'P.$Enums.Some[]'}
  `('printCreateDtoPropType($field) -> $expected', ({ field, expected }) => {
    expect(propType(field)).toEqual(expected);
  });
});
