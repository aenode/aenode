import 'reflect-metadata';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './test-helpers.js';

describe('Boolean Array Validation', () => {
  it.each`
    options                                                       | value                      | errors
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: undefined }}    | ${[]}
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: null }}         | ${[]}
    ${{ type: Boolean, required: true } as PropValidationOptions} | ${{ value: [undefined] }}  | ${['isDefined', 'isBoolean']}
    ${{ type: Boolean, required: true } as PropValidationOptions} | ${{ value: [null] }}       | ${['isDefined', 'isBoolean']}
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: [true] }}       | ${[]}
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: [false] }}      | ${[]}
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: [1] }}          | ${['isBoolean']}
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: [''] }}         | ${['isBoolean']}
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: [new Date()] }} | ${['isBoolean']}
    ${{ type: Boolean } as PropValidationOptions}                 | ${{ value: [{}] }}         | ${['isBoolean']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: boolean[];
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
