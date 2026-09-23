import 'reflect-metadata';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './test-helpers.js';

describe('Boolean Validation', () => {
  it.each`
    options                                        | value                    | errors
    ${{} as PropValidationOptions}                 | ${{ value: undefined }}  | ${[]}
    ${{} as PropValidationOptions}                 | ${{ value: null }}       | ${[]}
    ${{ required: true } as PropValidationOptions} | ${{ value: undefined }}  | ${['isDefined', 'isBoolean']}
    ${{ required: true } as PropValidationOptions} | ${{ value: null }}       | ${['isDefined', 'isBoolean']}
    ${{} as PropValidationOptions}                 | ${{ value: true }}       | ${[]}
    ${{} as PropValidationOptions}                 | ${{ value: false }}      | ${[]}
    ${{} as PropValidationOptions}                 | ${{ value: 1 }}          | ${['isBoolean']}
    ${{} as PropValidationOptions}                 | ${{ value: '' }}         | ${['isBoolean']}
    ${{} as PropValidationOptions}                 | ${{ value: new Date() }} | ${['isBoolean']}
    ${{} as PropValidationOptions}                 | ${{ value: {} }}         | ${['isBoolean']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: boolean;
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
