import 'reflect-metadata';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './test-helpers.js';

describe('Object Array Validation', () => {
  class Obj {
    @PropValidation() name: string;
  }
  it.each`
    options                                                         | value                        | errors
    ${{ type: () => Obj } as PropValidationOptions}                 | ${{ value: undefined }}      | ${[]}
    ${{ type: () => Obj } as PropValidationOptions}                 | ${{ value: null }}           | ${[]}
    ${{ type: () => Obj, required: true } as PropValidationOptions} | ${{ value: null }}           | ${['isArray', 'isObject', 'nestedValidation']}
    ${{ type: () => Obj, required: true } as PropValidationOptions} | ${{ value: undefined }}      | ${['isArray', 'isObject']}
    ${{ type: () => Obj, required: true } as PropValidationOptions} | ${{ value: [null] }}         | ${['isObject', 'nestedValidation']}
    ${{ type: () => Obj, required: true } as PropValidationOptions} | ${{ value: [undefined] }}    | ${['isObject']}
    ${{ type: () => Obj } as PropValidationOptions}                 | ${{ value: [{ name: '' }] }} | ${[]}
    ${{ type: () => Obj } as PropValidationOptions}                 | ${{ value: [{ name: '' }] }} | ${[]}
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
