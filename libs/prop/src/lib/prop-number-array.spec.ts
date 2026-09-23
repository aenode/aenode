import 'reflect-metadata';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop.js';
import { transformAndValidate } from './test-helpers.js';

describe('Number Array Validation', () => {
  it.each`
    options                                               | value                   | errors
    ${{ type: Number } as PropOptions}                    | ${{ value: undefined }} | ${[]}
    ${{ type: Number } as PropOptions}                    | ${{ value: null }}      | ${[]}
    ${{ type: Number, required: true } as PropOptions}    | ${{ value: undefined }} | ${['isNumber', 'isDefined', 'isArray']}
    ${{ type: Number, required: true } as PropOptions}    | ${{ value: null }}      | ${['isNumber', 'isDefined', 'isArray']}
    ${{ type: Number } as PropOptions}                    | ${{ value: [1] }}       | ${[]}
    ${{ type: Number } as PropOptions}                    | ${{ value: [-1] }}      | ${[]}
    ${{ type: Number, format: 'percent' } as PropOptions} | ${{ value: [0] }}       | ${[]}
    ${{ type: Number, format: 'integer' } as PropOptions} | ${{ value: [0] }}       | ${[]}
    ${{ type: Number } as PropOptions}                    | ${{ value: [0] }}       | ${[]}
    ${{ type: Number, min: 5 } as PropOptions}            | ${{ value: [4] }}       | ${['min']}
    ${{ type: Number, max: 5 } as PropOptions}            | ${{ value: [6] }}       | ${['max']}
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
