import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Object Array Validation', () => {
  class Obj {
    @PropValidation() name: string;
  }
  it.each`
    options                                               | value                        | errors
    ${{ type: () => Obj } as PropOptions}                 | ${{ value: undefined }}      | ${[]}
    ${{ type: () => Obj } as PropOptions}                 | ${{ value: null }}           | ${[]}
    ${{ type: () => Obj, required: true } as PropOptions} | ${{ value: null }}           | ${['isArray', 'isDefined', 'nestedValidation']}
    ${{ type: () => Obj, required: true } as PropOptions} | ${{ value: undefined }}      | ${['isArray', 'isDefined']}
    ${{ type: () => Obj, required: true } as PropOptions} | ${{ value: [null] }}         | ${['isDefined', 'nestedValidation']}
    ${{ type: () => Obj, required: true } as PropOptions} | ${{ value: [undefined] }}    | ${['isDefined']}
    ${{ type: () => Obj } as PropOptions}                 | ${{ value: [{ name: '' }] }} | ${[]}
    ${{ type: () => Obj } as PropOptions}                 | ${{ value: [{ name: '' }] }} | ${[]}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: Obj[];
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
