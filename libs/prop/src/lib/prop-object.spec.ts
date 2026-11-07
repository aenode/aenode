import { transformAndValidateSyncTest } from './common/transform-and-validate.js';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';

describe('Object Validation', () => {
  class Obj {
    @PropValidation() name: string;
  }
  it.each`
    options                                        | value                      | errors
    ${{} as PropValidationOptions}                 | ${{ value: undefined }}    | ${[]}
    ${{} as PropValidationOptions}                 | ${{ value: null }}         | ${[]}
    ${{ required: true } as PropValidationOptions} | ${{ value: undefined }}    | ${['isObject']}
    ${{ required: true } as PropValidationOptions} | ${{ value: null }}         | ${['isObject', 'nestedValidation']}
    ${{} as PropValidationOptions}                 | ${{ value: { name: '' } }} | ${[]}
    ${{} as PropValidationOptions}                 | ${{ value: { name: '' } }} | ${[]}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: Obj;
      }

      const foundConstraints = transformAndValidateSyncTest(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
