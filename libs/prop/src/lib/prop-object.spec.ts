import 'reflect-metadata';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './test-helpers.js';

describe('Object Validation', () => {
  class Obj {
    @PropValidation() name: string;
  }
  it.each`
    options                                                         | value                      | errors
    ${{} as PropValidationOptions}                                  | ${{ value: undefined }}    | ${[]}
    ${{} as PropValidationOptions}                                  | ${{ value: null }}         | ${[]}
    ${{ type: () => Obj, required: true } as PropValidationOptions} | ${{ value: undefined }}    | ${['isDefined']}
    ${{ type: () => Obj, required: true } as PropValidationOptions} | ${{ value: null }}         | ${['isDefined', 'nestedValidation']}
    ${{} as PropValidationOptions}                                  | ${{ value: { name: '' } }} | ${[]}
    ${{} as PropValidationOptions}                                  | ${{ value: { name: '' } }} | ${[]}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: Obj;
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
