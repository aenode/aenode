import 'reflect-metadata';
import type { PropValidationOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Number Array Validation', () => {
  it.each`
    options                                                         | value                   | errors
    ${{ type: Number } as PropValidationOptions}                    | ${{ value: undefined }} | ${[]}
    ${{ type: Number } as PropValidationOptions}                    | ${{ value: null }}      | ${[]}
    ${{ type: Number, required: true } as PropValidationOptions}    | ${{ value: undefined }} | ${['isNumber', 'isDefined', 'isArray']}
    ${{ type: Number, required: true } as PropValidationOptions}    | ${{ value: null }}      | ${['isNumber', 'isDefined', 'isArray']}
    ${{ type: Number } as PropValidationOptions}                    | ${{ value: [1] }}       | ${[]}
    ${{ type: Number } as PropValidationOptions}                    | ${{ value: [-1] }}      | ${[]}
    ${{ type: Number, format: 'percent' } as PropValidationOptions} | ${{ value: [0] }}       | ${[]}
    ${{ type: Number, format: 'integer' } as PropValidationOptions} | ${{ value: [0] }}       | ${[]}
    ${{ type: Number } as PropValidationOptions}                    | ${{ value: [0] }}       | ${[]}
    ${{ type: Number, min: 5 } as PropValidationOptions}            | ${{ value: [4] }}       | ${['min']}
    ${{ type: Number, max: 5 } as PropValidationOptions}            | ${{ value: [6] }}       | ${['max']}
  `(
    'PropValidation($options) should validate $value',
    ({ options, value, errors }) => {
      class Sample {
        @PropValidation(options) value: number[];
      }

      const foundConstraints = transformAndValidate(Sample, value);
      expect(foundConstraints.sort()).toEqual(errors.sort());
      expect(foundConstraints.sort()).toEqual(errors.sort());
    },
  );
});
