import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Number Validation', () => {
  it.each`
    options                                           | value                   | errors
    ${{} as PropValidationOptions}                    | ${{ value: undefined }} | ${[]}
    ${{} as PropValidationOptions}                    | ${{ value: null }}      | ${[]}
    ${{ required: true } as PropValidationOptions}    | ${{ value: undefined }} | ${['isNumber', 'isDefined']}
    ${{ required: true } as PropValidationOptions}    | ${{ value: null }}      | ${['isNumber', 'isDefined']}
    ${{} as PropValidationOptions}                    | ${{ value: 1 }}         | ${[]}
    ${{} as PropValidationOptions}                    | ${{ value: -1 }}        | ${[]}
    ${{ format: 'percent' } as PropValidationOptions} | ${{ value: 0 }}         | ${[]}
    ${{ format: 'integer' } as PropValidationOptions} | ${{ value: 0 }}         | ${[]}
    ${{} as PropValidationOptions}                    | ${{ value: 0 }}         | ${[]}
    ${{ min: 5 } as PropValidationOptions}            | ${{ value: 4 }}         | ${['min']}
    ${{ max: 5 } as PropValidationOptions}            | ${{ value: 6 }}         | ${['max']}
    ${{ format: 'percent' } as PropValidationOptions} | ${{ value: 0 }}         | ${[]}
    ${{ format: 'integer' } as PropValidationOptions} | ${{ value: 0.12 }}      | ${['isInt']}
    ${{ format: 'percent' } as PropValidationOptions} | ${{ value: -1 }}        | ${['min']}
    ${{ format: 'percent' } as PropValidationOptions} | ${{ value: 101 }}       | ${['max']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: number;
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
